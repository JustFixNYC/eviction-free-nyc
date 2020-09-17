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
    text: string | string[],
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

    if (Array.isArray(text)) {
      text = text.join("\n");
    }

    return {
      text,
      conversationStatus: status,
      state: serializeConversationState(nextState),
    };
  }

  say(options: {
    text: string | string[];
    nextHandler: ConversationHandlerMethod;
    stateUpdates?: Partial<State>;
  }): ConversationResponse {
    return this.response(
      options.text,
      options.nextHandler.name,
      ConversationStatus.Loop,
      options.stateUpdates
    );
  }

  ask(options: {
    text: string | string[];
    nextHandler: ConversationHandlerMethod;
    stateUpdates?: Partial<State>;
  }): ConversationResponse {
    return this.response(
      options.text,
      options.nextHandler.name,
      ConversationStatus.Ask,
      options.stateUpdates
    );
  }

  end(text: string | string[]): ConversationResponse {
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
  handle_start() {
    return this.say({
      text: `
        Right to Counsel is a new law in NYC that provides free legal representation for eligible tenants. You may qualify based on:
        - where you live in NYC
        - income and household size
        - your eviction notice
      `,
      nextHandler: this.handle_intro2,
    });
  }

  handle_intro2() {
    return this.ask({
      text: `Let's see if you have the right to a free attorney! To start, what is your address and borough? Example: 654 Park Place, Brooklyn`,
      nextHandler: this.handle_receiveContactAddress,
    });
  }

  async handle_receiveContactAddress() {
    const results = await geoSearch(this.input, { fetch: fetch as any });
    if (!results.features.length) {
      return this.ask({
        text: `Hmm, we couldn't understand that address. Can you try being more specific?`,
        nextHandler: this.handle_receiveContactAddress,
      });
    }
    const props = results.features[0].properties;
    return this.ask({
      text: `
        Is this your address?
        ${props.label}
        Please reply with either Yes or No.
      `,
      nextHandler: this.handle_confirmAddress,
      stateUpdates: {
        boroughGid: props.borough_gid,
        zip: props.postalcode,
        bbl: props.pad_bbl,
      },
    });
  }

  handle_confirmAddress() {
    if (isYes(this.input)) {
      return this.ask({
        text: `
          Your eligibility depends on your household size and annual income:
          
          Household Size / Annual Income
          1 person / $24,120
          2 people / $32,480
          3 people / $40,840
          4 people / $49,200
          5 people / $57,560
          6 people / $65,920

          Do you think you are income eligible? Please reply with either Yes or No.
        `,
        nextHandler: this.handle_receiveIncomeAnswer,
      });
    } else if (isNo(this.input)) {
      return this.say({
        text: "Oops, let's try again!",
        nextHandler: this.handle_intro2,
      });
    } else {
      return this.ask({
        text: INVALID_YES_OR_NO,
        nextHandler: this.handle_confirmAddress,
      });
    }
  }

  handle_receiveIncomeAnswer() {
    const isIncomeEligible = parseYesOrNo(this.input);

    if (isIncomeEligible === undefined) {
      return this.ask({
        text: INVALID_YES_OR_NO,
        nextHandler: this.handle_receiveIncomeAnswer,
      });
    }

    return this.ask({
      text: `Last question: what type of eviction notice did you receive? Please answer Nonpayment, Holdover, or Other.`,
      nextHandler: this.handle_receiveEvictionType,
      stateUpdates: {
        isIncomeEligible,
      },
    });
  }

  handle_receiveEvictionType() {
    let evictionType: EvictionType;

    if (/non/i.test(this.input)) {
      evictionType = "nonpay";
    } else if (/hold/i.test(this.input)) {
      evictionType = "holdover";
    } else if (/other/i.test(this.input)) {
      evictionType = "general";
    } else {
      return this.ask({
        text:
          "Sorry, I didn't understand that. Please respond with Nonpayment, Holdover, or Other.",
        nextHandler: this.handle_receiveEvictionType,
      });
    }

    const help = getRtcHelp(ensureRtcInfo({ ...this.state, evictionType }));

    return this.end(`
      ${help.title}

      Visit ${help.url} for next steps.
    `);
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
