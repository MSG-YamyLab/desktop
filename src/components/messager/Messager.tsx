import { useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import MessageInput from "./InputMessanger";
import { Message } from "./Message";
import { IMessage } from "../../interface/message/message";
import Cookies from "universal-cookie";
import { IChat, ITyped } from "../../interface/chat/chat";

type IProps = {
  chat: IChat;
  IsTyping: ITyped | undefined;
  setIsTyping: React.Dispatch<React.SetStateAction<ITyped | undefined>>;
};

export const Messanger: React.FC<IProps> = ({
  chat,
  IsTyping,
  setIsTyping,
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const accessToken = localStorage.getItem("access");
  const [myMessage, setMyMessage] = useState<string>("");

  const [message, setMessage] = useState<IMessage[]>();

  useEffect(() => {
    let socket: WebSocket | null = null;
    const connectWebSocket = () => {
      if (socket) {
        socket.close();
      }

      socket = new WebSocket(
        `ws://192.168.1.5:8000/ws/chat/${chat.id}/messages?token=${accessToken}`
      );

      socket.onopen = () => {};

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessage(data);
      };

      socket.onclose = () => {};
      setWs(socket);
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [chat.id, accessToken]);

  const sendMessage = () => {
    if (myMessage.trim() && ws) {
      ws.send(
        JSON.stringify({
          chat: chat.id,
          content: myMessage,
        })
      );
      setMyMessage("");
    }
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Вказуємо тип елемента

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div className="w-[55%] h-full flex flex-col justify-between bg-side-100">
      <Header chat={chat} />

      <div
        className="flex-1 flex flex-col overflow-y-auto"
        ref={messagesEndRef}
      >
        <div className="flex flex-col gap-2 p-6">
          {message?.map((msg) => (
            <div key={msg.id} className="pt-3 pb-3">
              <Message msg={msg} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput
        setIsTyping={setIsTyping}
        IsTyping={IsTyping}
        chat={chat}
        sendMessage={sendMessage}
        setMyMessage={setMyMessage}
        myMessage={myMessage}
      />
    </div>
  );
};
