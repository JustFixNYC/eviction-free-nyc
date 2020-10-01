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
  kind: "textbot" | "user" | "error";
  text: string;
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

const TextbotPage: React.FC<RouteComponentProps<any>> = () => {
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
    callTextbot(options)
      .then((res) => {
        if (options.input) {
          addMessage(setMessages, { kind: "user", text: options.input });
        }
        setCurrInput("");
        setLastResponse(res);
      })
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
      if (lastResponse.conversationStatus === "loop") {
        cycleTextbot({ state: lastResponse.state });
      }
      inputRef.current && scrollElementIntoView(inputRef.current);
    }
  }, [lastResponse, prevLastResponse]);

  return (
    <section className="Page TextbotPage">
      {messages.map((message, i) => {
        return (
          <div key={i} className={`Message Message-${message.kind}`}>
            <div className="content">{message.text}</div>
          </div>
        );
      })}
      {isActive && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = currInput;
            const state = lastResponse ? lastResponse.state : undefined;
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
