import TextareaAutosize from "react-textarea-autosize";
import SendSvg from "../../assets/svg/icon/send.svg"
import { Type } from "../animation/Type";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IChat, ITyped } from "../../interface/chat/chat";
import { useAppSelector } from "../../hooks/reduxHooks";



type IProps = {
  sendMessage:any,
  setMyMessage:React.Dispatch<React.SetStateAction<string>>
  myMessage:string
  chat:IChat
  IsTyping: ITyped | undefined;
  setIsTyping: React.Dispatch<React.SetStateAction<ITyped | undefined>>;
}
const MessageInput:React.FC<IProps> = ({sendMessage, setMyMessage, myMessage, chat, IsTyping, setIsTyping}) => {
  const user = useAppSelector(state =>state.auth)


  useEffect(() => {
    if (!myMessage) {
      setIsTyping({id:chat.id, status:false});
      return;
    }

    setIsTyping({id:chat.id, status:true});

    const timeout = setTimeout(() => {
      setIsTyping({id:chat.id, status:false});
    }, 3000); 

    return () => clearTimeout(timeout);
  }, [myMessage]);

  const UserTyped = () => {
    const users = chat?.typed?.filter(x => x != user.id)
    if (users && users.length >=1)
      return true
    else
    return false
  }
  return (
    <div>
      <div className="p-4 pl-16 scale-110">

    { UserTyped() && <Type />}
      </div>
    <div className="flex items-center p-2  bg-transparent relative">
      <TextareaAutosize
        minRows={1} 
        maxRows={5}
        value={myMessage}
        onChange={(e) => setMyMessage(e.target.value)}
        placeholder="Type a message..."
        
        className="text-[#fff] font-normal relative flex-1 p-4 bg-side-200  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
     <div onClick={sendMessage} className="absolute flex justify-center items-center right-4 bottom-6 cursor-pointer  ">
        <img src={SendSvg}  alt = "send icon" className="scale-110" />
     </div>

    </div>
    </div>
  );
};

export default MessageInput;
