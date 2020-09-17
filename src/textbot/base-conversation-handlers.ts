import {
  ConversationStatus,
  ConversationResponse,
  deserializeConversationState,
  serializeConversationState,
} from "./conversation";
import { convertToText, TextType } from "./text-type";

export type BaseConversationState = {
  /**
   * The handler to call when processing the current state
   * and its input. It should either start with `handler_` or
   * be the special value `END`, which indicates that the
   * conversation is over.
   */
  handlerName: string;
};

/**
 * A method that performs some action based on the current
 * state of the conversation and returns a response.
 */
type ConversationHandlerMethod = () =>
  | ConversationResponse
  | Promise<ConversationResponse>;

type ResponseOptions<State extends BaseConversationState> = {
  /**
   * Optional updates to make to the conversation state.
   */
  stateUpdates?: Partial<State>;
};

export abstract class BaseConversationHandlers<
  State extends BaseConversationState
> {
  /** The current state of the conversation. */
  readonly state: State;

  /**
   * The text that the user recently sent the textbot, or the empty
   * string if nothing was sent.
   */
  readonly input: string;

  constructor(state?: State | string, input: string = "") {
    if (typeof state === "string" || typeof state === "undefined") {
      state = deserializeConversationState<State>(
        state,
        this.getInitialState()
      );
    }
    this.state = state;
    this.input = input;
  }

  /** Return the initial state of the conversation. */
  abstract getInitialState(): State;

  /**
   * Handle the current state of the conversation, calling the
   * appropriate conversation handler as needed.
   */
  async handle(): Promise<ConversationResponse> {
    const handlerMethod = this.getHandlerMethod(this.state.handlerName);
    return handlerMethod.call(this);
  }

  /**
   * Return the handler method with the given name, raising an exception
   * if it's invalid.
   */
  private getHandlerMethod(handlerName: string): ConversationHandlerMethod {
    if (!handlerName.startsWith("handle_")) {
      throw new Error(
        `Handler name '${handlerName}' must start with 'handle_'`
      );
    }
    const handlerMethod: ConversationHandlerMethod = this[handlerName];
    if (!(typeof handlerMethod === "function")) {
      throw new Error(`Handler '${handlerName}' does not exist`);
    }
    return handlerMethod;
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

  /**
   * Say something to the user (i.e., send them a text message)
   * without waiting for any further input from them, and
   * advance to the given conversation handler.
   */
  say(
    text: TextType,
    nextHandler: ConversationHandlerMethod,
    options: ResponseOptions<State> = {}
  ): ConversationResponse {
    return this.response(
      text,
      nextHandler.name,
      ConversationStatus.Loop,
      options.stateUpdates
    );
  }

  /**
   * Ask the user a question, awaiting input from them. The
   * given conversation handler will be called once they
   * respond.
   */
  ask(
    text: TextType,
    nextHandler: ConversationHandlerMethod,
    options: ResponseOptions<State> = {}
  ): ConversationResponse {
    return this.response(
      text,
      nextHandler.name,
      ConversationStatus.Ask,
      options.stateUpdates
    );
  }

  /**
   * Send the user the given text and end the conversation.
   */
  end(text: TextType): ConversationResponse {
    return this.response(text, "END", ConversationStatus.End);
  }
}
