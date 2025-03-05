import { useEffect, useState } from "react";
import { User } from "../avatar/User";
import { IUser } from "../../interface/auth/auth";
import MinusUserSvg from "../../assets/svg/icon/minus-square.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { authActions } from "../../redux/slice/authSlice";
import { authService } from "../../service/authService";
import { useNavigate } from "react-router-dom";
import MessageSvg from "../../assets/svg/icon/message.svg"
type IProps = {
  setContact: React.Dispatch<React.SetStateAction<boolean>>
}
export const Contact:React.FC<IProps> = ({setContact: setContactVisible}) => {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("access");
  const [contacts, setContact] = useState<IUser[]>();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    let socket: WebSocket;
    let reconnectInterval: any;
    
    const connectWebSocket = () => {
      socket = new WebSocket(
        `ws://192.168.1.5:8000/ws/users/test?token=${accessToken}`
      );

      socket.onopen = () => {
        clearInterval(reconnectInterval);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setContact(data?.contacts);
      };
      socket.onclose = () => {
        reconnectInterval = setTimeout(connectWebSocket, 3000);
      };
    };

    connectWebSocket();
    return () => {
      if (socket) socket.close();
    };
  }, [accessToken]);
  const delUserByContact = async (id: number) => {
    dispatch(authActions.delContactUser({ id }));
  };
  const userContact: any = useAppSelector((state) => state.auth.contacts);

  const createChat = async (id:number) => {
    const res = await authService.createChatById({user_id:id})
    if (res.status === 201){
      const chatId = res.data.id
      setContactVisible(false)
      navigate(`/chat/${chatId}`)
    }  
  }

  return (
    <>
      {contacts?.map((user) => (
        <div key={user.id} className="flex items-center gap-4 cursor-pointer" >
          <User
            img={user.profile?.avatar[user.profile.avatar.length - 1]?.image}
            is_online={user.is_online}
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col justify-center">
              <div className="text-[#fff] font-normal">{user.nickname}</div>
              <div className="font-normal text-side-300">
                {user.is_online ? "Online" : "Offline"}
              </div>
            </div>
            <div className="flex items-center gap-2">

            <img src={MessageSvg}  className="cursor-pointer" alt="icon msg" onClick={() => createChat(user.id)}/>

            {userContact?.includes(user?.id) && (
              <img
                src={MinusUserSvg}
                alt="icon del user"
                className="cursor-pointer"
                onClick={() => delUserByContact(user.id)}
              />
            )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
