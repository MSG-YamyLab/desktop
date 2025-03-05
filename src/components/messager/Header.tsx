import MenuMessageSvg from "../../assets/svg/icon/menu-message.svg"
import DividerSvg from "../../assets/svg/icon/divider.svg"
import SearchSvg from "../../assets/svg/icon/search.svg"
import CallSvg from "../../assets/svg/icon/call.svg"
import { User } from "../avatar/User"
import { IChat } from "../../interface/chat/chat"
import { useAppSelector } from "../../hooks/reduxHooks"
import TrashSvg from "../../assets/svg/icon/trash.svg"
import { authActions } from "../../redux/slice/authSlice"
import { authService } from "../../service/authService"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { IUser } from "../../interface/auth/auth"

type IProps = {
    chat: IChat
}

export const Header: React.FC<IProps> = ({ chat }) => {
    const user = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("access");
    const { users } = useOutletContext<{ 
      users: IUser[] ; 
    }>();
  
    const getPartnerUser = () => {

        const user_partner_id = chat?.users?.find(x => x.id !== user.id)?.id

        if (!user_partner_id) {
            throw new Error('Partner user not found')
        }
        const partner = users?.find(x=>x.id === user_partner_id)
        if (!partner){
          return chat?.users?.find(x => x.id !== user.id)
        }
        return partner
    }

      

    const partnerUser = getPartnerUser()
    const deleteChat = async (id:number) => {
        const res = await authService.deleteChatById(id)
        if (res.status ===204){
            navigate('/')
        }    

    
    }
    return (
        <div id="header-message" className="flex justify-between pl-6 pr-6 items-center h-[8%] bg-[#353540]/50 backdrop-blur-md">
            <div className="flex gap-2 items-center">
                <User img={partnerUser?.profile?.avatar?.[partnerUser.profile.avatar.length - 1]?.image ?? ''} />
                <div>
                    <div className="text-[#fff] font-normal">
                        {partnerUser?.profile?.name} {partnerUser?.profile?.surname}
                    </div>
                    <div className="text-[#1C92B5] font-normal">
                        {partnerUser?.is_online ? 'Online' : 'Offline'}
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-center relative">
                <img className="h-5 cursor-pointer" src={CallSvg} alt="Call" />
                <img className="h-5 cursor-pointer" src={SearchSvg} alt="Search" />
                <img className="h-5 cursor-pointer" src={DividerSvg} alt="Divider" />
                {/* <img className=" relative h-5 cursor-pointer" src={MenuMessageSvg} alt="Menu" /> */}
                <img className=" h-5 cursor-pointer " src={TrashSvg} alt="trash" onClick={()=>deleteChat(chat.id)} />
            </div>
       
        </div>
    )
}
