import { User } from "../avatar/User";
import ReadSvg from "../../assets/svg/message/read.svg";
import { Type } from "../animation/Type";
import { IChat, ITyped } from "../../interface/chat/chat";
import { useAppSelector } from "../../hooks/reduxHooks";

type IProps = {
  IsRead?: boolean;
  IsNew?:string
  IsPean?:boolean
  IsTyping?:ITyped

  chat?:IChat
};
export const Chat: React.FC<IProps> = ({ IsRead, IsNew, IsPean, IsTyping, chat}) => {
  const user = useAppSelector(state =>state.auth)
  const UsersTyped  = () =>{

  }

  const getAvatar = () =>{
    const avatar = chat?.users.filter(x => x.id !== user.id)[0].profile?.avatar
    if  (!avatar)
      return ''
    return avatar[avatar?.length-1]?.image
  }

  const getMeParnter = () => {
    return chat?.users.filter(x => x.id !== user.id)[0]
  }

  const UserTyped = () => {
    const users = chat?.typed?.filter(x => x != user.id)
    if (users && users.length >=1)
      return true
    else
    return false
  }
  return (
    <div className="w-full bg-transparent  flex  items-center justify-start gap-2  box-border h-fit   cursor-pointer  ">
      <div className="w-1/6">
        <User img={getAvatar()} />
      </div>
      <div className="flex flex-col justify-between gap-1 w-5/6 box-border  ">
      {
        IsRead ?
        <div className="flex justify-between">
            <div className="font-normal text-base text-primary-500">{getMeParnter()?.profile?.name} {getMeParnter()?.profile?.surname}</div>
            <img src={ReadSvg} alt="readt svg icon"/>
        </div>
        
        :
        IsNew ?
        <div className="flex justify-between">
        <div className="font-normal text-base text-primary-500">{getMeParnter()?.profile?.name} {getMeParnter()?.profile?.surname}</div>
        <div className={`w-6 h-6 flex justify-center items-center rounded-full  text-[#fff] ${IsPean?"bg-[#F02037]": "bg-[#272730]"} text-sm font-normal `}>{IsNew}</div>
    </div>
    :
        <div className="font-normal text-base text-primary-500">{getMeParnter()?.profile?.name} {getMeParnter()?.profile?.surname}</div>
      }



        <div className="flex justify-between items-center w-full gap-2  ">
          <div className="font-normal text-sm text-side-300 truncate   ">
            {  false? <Type /> : <>{chat?.message?.content}</>}
          </div>

          <div className="text-sm font-light   text-side-300 box-border whitespace-nowrap">
          {chat?.message?.create_at &&
            new Intl.DateTimeFormat("uk-UA", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(chat.message.create_at))}

          </div>
        </div>
      </div>
    </div>
  );
};
