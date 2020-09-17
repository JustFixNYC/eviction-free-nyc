import React from "react";
import {
  ConversationStatus,
  ConversationResponse,
  deserializeConversationState,
  serializeConversationState,
} from "./conversation";

export type BaseConversationState = {
  handlerName: string;
};

type ConversationHandlerMethod = () =>
  | ConversationResponse
  | Promise<ConversationResponse>;

type ResponseOptions<State extends BaseConversationState> = {
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

export abstract class BaseConversationHandlers<State extends BaseConversationState> {
  readonly state: State;

  constructor(state?: State | string, readonly input: string = "") {
    if (typeof state === "string" || typeof state === "undefined") {
      state = deserializeConversationState<State>(state, this.getInitialState());
    }
    this.state = state;
  }

  abstract getInitialState(): State;

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
    options: ResponseOptions<State> = {}
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
    options: ResponseOptions<State> = {}
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
