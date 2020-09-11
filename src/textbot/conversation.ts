/**
 * A conversation handler is responsible for taking a conversation's
 * current state, along with optional user input (it may be an
 * empty string), and returning a response that describes any text
 * to display, along with the new state of the conversation.
 */
export type ConversationHandler<State> = (state: State, input: string) => ConversationResponse|Promise<ConversationResponse>;

/**
 * The status of a conversation after a conversation handler has returned.
 */
export enum ConversationStatus {
  /** The conversation is over. */
  End = "end",

  /** A question has just been asked, so the UI should wait for user input. */
  Ask = "ask",

  /** 
   * A message has been displayed, but it is not a question, so the UI
   * should not wait for user input.
   */
  Loop = "loop",
};

/**
 * A response returned by a conversation handler.
 */
export type ConversationResponse = {
  /** The text that the UI should show the user. */
  text: string,

  /** The current status of the conversation. */
  conversationStatus: ConversationStatus,

  /**
   * The current internal state of the conversation. It's
   * meant to be opaque and passed back into the
   * conversation handler when it's next run.
   */
  state: string,
};

/**
 * Deserializes the conversation state from a string to an
 * object, returning a default value if the state was invalid or empty.
 */
export function deserializeConversationState<State extends Object>(serializedValue: string|undefined, defaultValue: State): State {
  if (!serializedValue) return defaultValue;

  try {
    const result = JSON.parse(serializedValue);
    if (!(result && typeof(result) === 'object')) {
      console.warn(`Received state that is not an object.`);
      return defaultValue;
    }
    return result;
  } catch (e) {
    console.warn(`Received state that is not valid JSON.`);
    return defaultValue;
  }
}

/**
 * Serialize the conversation state to a string.
 */
export function serializeConversationState<State extends Object>(state: State): string {
  return JSON.stringify(state);
}
