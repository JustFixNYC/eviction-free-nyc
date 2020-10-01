import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import "../styles/TextbotPage.scss";
import { ConversationResponse } from "../textbot/conversation";

type CallTextbotOptions = { state?: string; input?: string };

function callTextbot({
  state,
  input,
}: CallTextbotOptions): Promise<ConversationResponse> {
  const params = new URLSearchParams();
  if (state) {
    params.set("state", state);
  }
  params.set("input", input || "");
  return fetch(`/.netlify/functions/textbot?${params.toString()}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`Serverless handler returned HTTP ${response.status}`);
      }
      return response.json();
    }
  );
}

type Message = {
  kind: "textbot" | "user" | "error" | "debug";
  text: string | JSX.Element;
};

// https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function scrollElementIntoView(el: HTMLElement) {
  setTimeout(() => {
    el.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" });
    el.focus();
  }, 10);
}

function addMessage(
  setMessages: Dispatch<SetStateAction<Message[]>>,
  message: Message
) {
  setMessages((messages) => [...messages, message]);
}

const TextbotPage: React.FC<RouteComponentProps<any>> = (props) => {
  const params = new URLSearchParams(props.location.search);
  const debug = !!params.get("debug");
  const inputRef = useRef<HTMLInputElement>(null);
  const [currInput, setCurrInput] = useState("");
  const [lastResponse, setLastResponse] = useState<ConversationResponse | null>(
    null
  );
  const prevLastResponse = usePrevious(lastResponse);
  const [messages, setMessages] = useState<Message[]>([]);
  const isActive = lastResponse && lastResponse.conversationStatus !== "end";
  const cycleTextbot = (options: CallTextbotOptions) => {
    setIsThinking(true);
    addMessage(setMessages, {
      kind: "debug",
      text: (
        <>
          Communicating with textbot with{" "}
          {options.input ? (
            <>
              input <code>{options.input}</code>
            </>
          ) : (
            <>no input</>
          )}{" "}
          and{" "}
          {options.state ? (
            <>
              state <code>{options.state}</code>
            </>
          ) : (
            <>no state</>
          )}
          .
        </>
      ),
    });
    setCurrInput("");
    callTextbot(options)
      .then(setLastResponse)
      .catch((e) => {
        addMessage(setMessages, { kind: "error", text: e.toString() });
      })
      .finally(() => setIsThinking(false));
  };
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => cycleTextbot({}), []);
  useEffect(() => {
    if (lastResponse && lastResponse !== prevLastResponse) {
      if (lastResponse.text) {
        addMessage(setMessages, { kind: "textbot", text: lastResponse.text });
      }
      addMessage(setMessages, {
        kind: "debug",
        text: (
          <>
            Textbot responded with conversation status{" "}
            <code>{lastResponse.conversationStatus}</code> and state{" "}
            <code>{lastResponse.state}</code>.
          </>
        ),
      });
      if (lastResponse.conversationStatus === "loop") {
        cycleTextbot({ state: lastResponse.state });
      }
      inputRef.current && scrollElementIntoView(inputRef.current);
    }
  }, [lastResponse, prevLastResponse]);

  return (
    <section className="Page TextbotPage">
      {messages
        .filter((message) => (message.kind === "debug" ? debug : true))
        .map((message, i) => {
          return (
            <div key={i} className={`Message Message-${message.kind}`}>
              <div className="content">{message.text}</div>
            </div>
          );
        })}
      {isActive && (
        <form
          className={isThinking ? "disabled" : ""}
          onSubmit={(e) => {
            e.preventDefault();
            const input = currInput;
            const state = lastResponse ? lastResponse.state : undefined;
            addMessage(setMessages, { kind: "user", text: input });
            cycleTextbot({ input, state });
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={currInput}
            onChange={(e) => setCurrInput(e.target.value)}
            disabled={isThinking}
          />
          <button disabled={isThinking}>Send</button>
        </form>
      )}
    </section>
  );
};

export default TextbotPage;
