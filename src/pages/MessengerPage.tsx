import { useOutletContext, useParams } from "react-router-dom";
import { Messanger } from "../components/messager/Messager";
import { InfoBar } from "../components/side/InfoBar";
import { useEffect, useState } from "react";
import { IChat, ITyped } from "../interface/chat/chat";
import { authService } from "../service/authService";
import { useAppSelector } from "../hooks/reduxHooks";


export const MessengerPage = () => {
  const { id } = useParams();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [IsTyping, setIsTyping] = useState<ITyped>()
  const [chat, setChat] = useState<IChat | null>(null);
  const user = useAppSelector(state=>state.auth)
  const accessToken = localStorage.getItem("access");



  useEffect(() => {
    let socket: WebSocket | null = null;
    const connectWebSocket = () => {
        if (socket) {
            socket.close();
        }

        socket = new WebSocket(`ws://192.168.1.5:8000/ws/chat/me/${id}?token=${accessToken}`);


        socket.onopen = () => {
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setChat(data);
        };
        

        socket.onclose = () => {
        };
        setWs(socket);

    };


    connectWebSocket();

    return () => {
        if (socket) {
            socket.close();
        }
    };


}, [id, accessToken]);

const addUserIdByArr = () => {
  if (!chat) return [];

  if (IsTyping?.status) {
    if (!Array.isArray(chat.typed)) chat.typed = [];
    
    if (!chat.typed.includes(user.id)) {
      return [...chat.typed, user.id];
    }
    return chat.typed;
  } else {
    return chat.typed?.filter(x => x !== user.id) || [];
  }
};
useEffect(() => {
  const updateChatTyping = () => {
    if (IsTyping && ws) {
      ws.send(
        JSON.stringify({
            "chat":id,
            "users":addUserIdByArr()
        })
      );

    }
  };
  updateChatTyping()
},[IsTyping])


  return (
    <>
      {chat && (
        <>
          <Messanger chat={chat} setIsTyping={setIsTyping}  IsTyping={IsTyping}  />
          <InfoBar chat={chat} />
        </>
      )}
    </>
  );
};
