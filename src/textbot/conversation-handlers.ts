import { geoSearch } from "@justfixnyc/geosearch-requester";
import {
  ConversationStatus,
  ConversationHandler,
  ConversationResponse,
  deserializeConversationState,
  serializeConversationState,
} from "./conversation";
import { RtcInfo, EvictionType, getRtcHelp, ensureRtcInfo } from "./rtc";
import fetch from "node-fetch";

const INVALID_YES_OR_NO = `Sorry, I didn't understand that. Please respond with Yes or No.`;

type ConversationHandlerName = keyof ConversationHandlers;

/**
 * This is the internal state used by our conversation handlers. Care
 * should be taken in changing its schema, since in-progress
 * conversations may end up using old versions of its schema.
 */
type State = Partial<RtcInfo> & {
  handlerName: ConversationHandlerName;
};

type Handler = ConversationHandler<State>;

/**
 * This maps conversation handler "names" to actual conversation handlers
 * to effectively form a finite state machine (FSM).
 *
 * Because the names of these handlers (i.e., the properties of the class)
 * are stored in the conversation state, care should be taken in
 * renaming/changing them, since existing conversations that are in that
 * state may misbehave.
 *
 * (Note that this isn't really useful as a "class" per se, but it was the
 * easiest way to create a type-safe mapping from strings to conversation
 * handlers.)
 */
class ConversationHandlers {
  intro1: Handler = (s) => {
    return say(
      s,
      [
        `Right to Counsel is a new law in NYC that provides free legal representation for eligible tenants. You may qualify based on:`,
        `- where you live in NYC`,
        `- income and household size`,
        `- your eviction notice`,
      ],
      "intro2"
    );
  };

  intro2: Handler = (s) => {
    return ask(
      s,
      `Let's see if you have the right to a free attorney! To start, what is your address and borough? Example: 654 Park Place, Brooklyn`,
      "receiveContactAddress"
    );
  };

  receiveContactAddress: Handler = async (s, input) => {
    const results = await geoSearch(input, { fetch: fetch as any });
    if (!results.features.length) {
      return ask(
        s,
        `Hmm, we couldn't understand that address. Can you try being more specific?`,
        "receiveContactAddress"
      );
    }
    const props = results.features[0].properties;
    return ask(
      s,
      [
        `Is this your address?`,
        props.label,
        `Please reply with either Yes or No.`,
      ],
      "confirmAddress",
      {
        boroughGid: props.borough_gid,
        zip: props.postalcode,
        bbl: props.pad_bbl,
      }
    );
  };

  confirmAddress: Handler = (s, input) => {
    if (isYes(input)) {
      return ask(
        s,
        [
          `Your eligibility depends on your household size and annual income:`,
          ``,
          `Household Size / Annual Income`,
          `1 person / $24,120`,
          `2 people / $32,480`,
          `3 people / $40,840`,
          `4 people / $49,200`,
          `5 people / $57,560`,
          `6 people / $65,920`,
          ``,
          `Do you think you are income eligible? Please reply with either Yes or No.`,
        ],
        "receiveIncomeAnswer"
      );
    } else if (isNo(input)) {
      return say(s, "Oops, let's try again!", "intro2");
    } else {
      return ask(s, INVALID_YES_OR_NO, "confirmAddress");
    }
  };

  receiveIncomeAnswer: Handler = (s, input) => {
    const isIncomeEligible = parseYesOrNo(input);

    if (isIncomeEligible === undefined) {
      return ask(s, INVALID_YES_OR_NO, "receiveIncomeAnswer");
    }

    return ask(
      s,
      [
        `Last question: what type of eviction notice did you receive? Please answer Nonpayment, Holdover, or Other.`,
      ],
      "receiveEvictionType",
      {
        isIncomeEligible,
      }
    );
  };

  receiveEvictionType: Handler = (s, input) => {
    let evictionType: EvictionType;

    if (/non/i.test(input)) {
      evictionType = "nonpay";
    } else if (/hold/i.test(input)) {
      evictionType = "holdover";
    } else if (/other/i.test(input)) {
      evictionType = "general";
    } else {
      return ask(
        s,
        "Sorry, I didn't understand that. Please respond with Nonpayment, Holdover, or Other.",
        "receiveEvictionType"
      );
    }

    const help = getRtcHelp(ensureRtcInfo({ ...s, evictionType }));

    return end(s, [help.title, "", `Visit ${help.url} for next steps.`]);
  };

  END: Handler = () => {
    throw new Error(
      `Assertion failure, the END conversation handler should never be called!`
    );
  };
}

const HANDLERS = new ConversationHandlers();

export async function handleConversation(
  input: string,
  serializedState?: string
): Promise<ConversationResponse> {
  const state = deserializeConversationState<State>(serializedState, {
    handlerName: "intro1",
  });

  // TODO: state.handlerName is ultimately untrusted input, and this may be an insecure way
  // of testing whether the handler name is valid.
  const handler = HANDLERS[state.handlerName];

  return handler(state, input);
}

function response(
  s: State,
  text: string | string[],
  nextStateHandler: ConversationHandlerName,
  status: ConversationStatus,
  stateUpdates?: Partial<State>
): ConversationResponse {
  const nextState: State = {
    ...s,
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

function ask(
  s: State,
  text: string | string[],
  nextStateHandler: ConversationHandlerName,
  stateUpdates?: Partial<State>
): ConversationResponse {
  return response(
    s,
    text,
    nextStateHandler,
    ConversationStatus.Ask,
    stateUpdates
  );
}

function say(
  s: State,
  text: string | string[],
  nextStateHandler: ConversationHandlerName,
  stateUpdates?: Partial<State>
): ConversationResponse {
  return response(
    s,
    text,
    nextStateHandler,
    ConversationStatus.Loop,
    stateUpdates
  );
}

function end(s: State, text: string | string[]): ConversationResponse {
  return response(s, text, "END", ConversationStatus.End);
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
