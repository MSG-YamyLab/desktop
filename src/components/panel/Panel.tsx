import NewMessageSvg from "../../assets/svg/panel/new_message.svg";
import { Chat } from "../chat/Chat";
import { Search } from "../search/Search";
import "./style.scss";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { IChat, ITyped } from "../../interface/chat/chat";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";


export const Panel= () => {
  const accessToken = localStorage.getItem("access");
  const navigate = useNavigate()
  const [chats, setChats] = useState<IChat[]>()
  const [ws, setWs] = useState<WebSocket | null>(null);
  const user = useAppSelector(state => state.auth)
  useEffect(() => {
    let socket: WebSocket;
    let reconnectInterval: any;
  
  
    const connectWebSocket = () => {
      socket = new WebSocket(`ws://192.168.1.5:8000/ws/chat/me?token=${accessToken}`);
  
      socket.onopen = () => {
        clearInterval(reconnectInterval);
      };
  
     socket.onmessage= (event) =>{
      const data = JSON.parse(event.data);
      setChats(data)
  

      
     }
      socket.onclose = () => {
        reconnectInterval = setTimeout(connectWebSocket, 3000);
      };
      setWs(socket);
  
    };
  
    connectWebSocket();
    return () => {
      if (socket) socket.close();
    };
  }, [accessToken]);



  return (
    <div className="w-1/5 h-screen bg-panel-400 flex flex-col p-2 border-r-[1px] border-[#353540] border-l-[1px]">
      <div className="h-16 w-full flex justify-between items-center p-4">
        <div className="text-[#fff] text-2xl font-normal">
          Messages <span className="text-lg font-light">48 new</span>
        </div>
        <img src={NewMessageSvg} alt="new message" className="cursor-pointer"/>
      </div>

      <div className="p-4">
        <Search />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {/* <div className="flex flex-col">
          <div className="flex items-center">
            <img src={PinSvg} />
            <div className="text-sm font-light text-side-300 ml-2">PIN CHATS</div>
          </div>
          <div className="mt-4 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <Chat IsNew="2"       // window.location.reload();
IsPean={true}/>
                <div className="mt-4 w-full h-[1px] bg-panel-300"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
        <div className="flex items-center">
            <img src={HechSvg} />
            <div className="text-sm font-light text-side-300 ml-2">GROUP & CHANNELS</div>
          </div>
          <div className="mt-4 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <Chat IsRead={true} />
                <div className=" mt-4 w-full h-[1px] bg-panel-300"></div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex flex-col">
          <div className="text-sm font-light text-side-300">ALL MESSAGES</div>
          <div className="mt-4 space-y-4">
            {chats && chats?.filter(chat => chat.message).map(chat =>  (

              <div key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)
              
                }>
                 {/* IsNew="5" IsPean={false} IsType={true} */}
                <Chat chat={chat}  />
                <div className=" mt-4 w-full h-[1px] bg-panel-300"></div>
              </div>

              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
