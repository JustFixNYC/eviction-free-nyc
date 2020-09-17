import React from "react";
import { geoSearch } from "@justfixnyc/geosearch-requester";
import {
  ConversationStatus,
  ConversationResponse,
  deserializeConversationState,
  serializeConversationState,
} from "./conversation";
import { RtcInfo, EvictionType, getRtcHelp, ensureRtcInfo } from "./rtc";
import fetch from "node-fetch";

const INVALID_YES_OR_NO = `Sorry, I didn't understand that. Please respond with Yes or No.`;

/**
 * This is the internal state used by our conversation handlers. Care
 * should be taken in changing its schema, since in-progress
 * conversations may end up using old versions of its schema.
 */
type State = Partial<RtcInfo> & {
  handlerName: string;
};

type ConversationHandlerMethod = () =>
  | ConversationResponse
  | Promise<ConversationResponse>;

type ResponseOptions = {
  stateUpdates?: Partial<State>;
};

type TextType = string | string[] | JSX.Element;

function convertToText(text: TextType): string {
  if (typeof text === "string") {
    return text;
  }
  if (Array.isArray(text)) {
    return text.join("\n");
  } else {
    const chunks: string[] = [];
    for (let child of React.Children.toArray(text.props.children)) {
      if (typeof child === "string") {
        chunks.push(child);
      } else if (typeof child === "object" && "key" in child) {
        if (child.type === "br") {
          chunks.push("\n");
        } else {
          console.log(`Not sure how to render <${child.type.toString()}>.`);
        }
      } else {
        console.log(`Not sure how to render "${child.toString()}".`);
      }
    }
    return chunks.join("");
  }
}

abstract class BaseConversationHandlers {
  readonly state: State;

  constructor(state?: State | string, readonly input: string = "") {
    if (typeof state === "string" || typeof state === "undefined") {
      state = deserializeConversationState<State>(state, {
        handlerName: "handle_start",
      });
    }
    this.state = state;
  }

  abstract handle_start(): ConversationResponse | Promise<ConversationResponse>;

  async handle(): Promise<ConversationResponse> {
    const { handlerName } = this.state;
    if (!handlerName.startsWith("handle_")) {
      throw new Error(
        `Handler name '${handlerName}' must start with 'handle_'`
      );
    }
    const handlerMethod: ConversationHandlerMethod = this[handlerName];
    if (!(typeof handlerMethod === "function")) {
      throw new Error(`Handler '${handlerName}' does not exist`);
    }
    return handlerMethod.call(this);
  }

  private response(
    text: TextType,
    nextStateHandler: string,
    status: ConversationStatus,
    stateUpdates?: Partial<State>
  ): ConversationResponse {
    if (
      !(nextStateHandler.startsWith("handle_") || nextStateHandler === "END")
    ) {
      throw new Error(`Invalid state handler name: ${nextStateHandler}`);
    }

    const nextState: State = {
      ...this.state,
      ...stateUpdates,
      handlerName: nextStateHandler,
    };

    return {
      text: convertToText(text),
      conversationStatus: status,
      state: serializeConversationState(nextState),
    };
  }

  say(
    text: TextType,
    nextHandler: ConversationHandlerMethod,
    options: ResponseOptions = {}
  ): ConversationResponse {
    return this.response(
      text,
      nextHandler.name,
      ConversationStatus.Loop,
      options.stateUpdates
    );
  }

  ask(
    text: TextType,
    nextHandler: ConversationHandlerMethod,
    options: ResponseOptions = {}
  ): ConversationResponse {
    return this.response(
      text,
      nextHandler.name,
      ConversationStatus.Ask,
      options.stateUpdates
    );
  }

  end(text: TextType): ConversationResponse {
    return this.response(text, "END", ConversationStatus.End);
  }
}

/**
 * This maps conversation handler "names" to actual conversation handlers
 * to effectively form a finite state machine (FSM).
 *
 * Because the names of these handlers (i.e., the properties of the class)
 * are stored in the conversation state, care should be taken in
 * renaming/changing them, since existing conversations that are in that
 * state may misbehave.
 *
 * Note that each handler must start with `handle_`.
 */
export class EfnycConversationHandlers extends BaseConversationHandlers {
  /** The beginning of the textbot flow! */
  handle_start() {
    return this.say(
      <>
        Right to Counsel is a new law in NYC that provides free legal
        representation for eligible tenants. You may qualify based on:
        <br />
        - where you live in NYC
        <br />
        - income and household size
        <br />- your eviction notice
      </>,
      this.handle_intro2
    );
  }

  /** Ask for the user's address. */
  handle_intro2() {
    return this.ask(
      <>
        Let's see if you have the right to a free attorney! To start, what is
        your address and borough? Example: 654 Park Place, Brooklyn
      </>,
      this.handle_receiveContactAddress
    );
  }

  /** Geocode the user's address and see if it's what they think it is. */
  async handle_receiveContactAddress() {
    const results = await geoSearch(this.input, { fetch: fetch as any });
    if (!results.features.length) {
      return this.ask(
        <>
          Hmm, we couldn't understand that address. Can you try being more
          specific?
        </>,
        this.handle_receiveContactAddress
      );
    }
    const props = results.features[0].properties;
    return this.ask(
      <>
        Is this your address?
        <br />
        {props.label}
        <br />
        Please reply with either Yes or No.
      </>,
      this.handle_confirmAddress,
      {
        stateUpdates: {
          boroughGid: props.borough_gid,
          zip: props.postalcode,
          bbl: props.pad_bbl,
        },
      }
    );
  }

  /**
   * If the user confirmed their address, ask them about their household
   * size/income.
   */
  handle_confirmAddress() {
    if (isYes(this.input)) {
      return this.ask(
        <>
          Your eligibility depends on your household size and annual income:
          <br />
          <br />
          Household Size / Annual Income
          <br />
          1 person / $24,120
          <br />
          2 people / $32,480
          <br />
          3 people / $40,840
          <br />
          4 people / $49,200
          <br />
          5 people / $57,560
          <br />
          6 people / $65,920
          <br />
          <br />
          Do you think you are income eligible? Please reply with either Yes or
          No.
        </>,
        this.handle_receiveIncomeAnswer
      );
    } else if (isNo(this.input)) {
      return this.say("Oops, let's try again!", this.handle_intro2);
    } else {
      return this.ask(INVALID_YES_OR_NO, this.handle_confirmAddress);
    }
  }

  /**
   * Once the user provides a valid household size/income answer, ask
   * them about their eviction notice type.
   */
  handle_receiveIncomeAnswer() {
    const isIncomeEligible = parseYesOrNo(this.input);

    if (isIncomeEligible === undefined) {
      return this.ask(INVALID_YES_OR_NO, this.handle_receiveIncomeAnswer);
    }

    return this.ask(
      <>
        Last question: what type of eviction notice did you receive? Please
        answer Nonpayment, Holdover, or Other.
      </>,
      this.handle_receiveEvictionType,
      {
        stateUpdates: {
          isIncomeEligible,
        },
      }
    );
  }

  /**
   * Once the user has answered their eviction notice type, give them
   * some basic help text with a URL to EFYNC.
   */
  handle_receiveEvictionType() {
    let evictionType: EvictionType;

    if (/non/i.test(this.input)) {
      evictionType = "nonpay";
    } else if (/hold/i.test(this.input)) {
      evictionType = "holdover";
    } else if (/other/i.test(this.input)) {
      evictionType = "general";
    } else {
      return this.ask(
        <>
          Sorry, I didn't understand that. Please respond with Nonpayment,
          Holdover, or Other.
        </>,
        this.handle_receiveEvictionType
      );
    }

    const help = getRtcHelp(ensureRtcInfo({ ...this.state, evictionType }));

    return this.end(
      <>
        {help.title}
        <br />
        <br />
        Visit {help.url} for next steps.
      </>
    );
  }
}

function isYes(text: string): boolean {
  return text.toLowerCase().startsWith("y");
}

function isNo(text: string): boolean {
  return text.toLowerCase().startsWith("n");
}

function parseYesOrNo(text: string): boolean | undefined {
  if (isYes(text)) return true;
  if (isNo(text)) return false;
  return undefined;
}
