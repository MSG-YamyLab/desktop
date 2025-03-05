import MenuSvg from "../../assets/svg/icon/menu.svg"
import CopySvg from "../../assets/svg/icon/copy.svg"
// import NotificationSvg from "../../assets/svg/icon/notification.svg"
import NotificationOffSvg from "../../assets/svg/icon/notificationOff.svg"
import MeddiaSvg from "../../assets/svg/icon/meddia.svg"

import PlusSvg from "../../assets/svg/icon/plus.svg"
import MemberSvg from "../../assets/svg/icon/member.svg"
import { Memeber } from "../member/Member"
import { IChat } from "../../interface/chat/chat"
import { useAppSelector } from "../../hooks/reduxHooks"
import { baseURL } from "../../constant"
import NoImage from "../../assets/image/bg_user.webp"
type IProps = {
    chat: IChat
}

export const InfoBar: React.FC<IProps> = ({ chat }) => {
    const user = useAppSelector(state => state.auth)
    
    const getPartnerUser = () => {
        const partner = chat?.users?.find(x => x.id !== user.id)
        if (!partner) {
            throw new Error('Partner user not found')
        }
        return partner
    }

    const partnerUser = getPartnerUser()
    const lastImage = partnerUser.profile?.avatar?.[partnerUser.profile.avatar.length - 1]?.image
    return (
        <div className="flex flex-col flex-1 h-full bg-side-100 p-4 border-l border-[#353540]">
            <div className="flex gap-2 p-4 items-center">
                <img src={MenuSvg} className="cursor-pointer" />
                <div className="text-[#fff] font-medium text-lg">Chat Info</div>
            </div>
            <div className="p-4 ">
                <div className="bg-side-300 h-[1px] w-full"></div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <img
                    src={lastImage? baseURL+lastImage : NoImage }
                    className="rounded-full object-cover w-28 h-28"
                    alt="Partner Avatar"
                />
                <div className="font-normal text-[#fff] text-lg pt-2">{partnerUser.profile?.name}</div>
                <div className="text-[#A1A1A1] font-light text-base">2 Members</div>
            </div>

            <div className="flex flex-col gap-2 p-4">
                <div className="text-[#fff] font-normal">Bio</div>
                <div className="text-[#A1A1A1] font-light">{partnerUser.profile?.bio ?? 'No bio available'}</div>
                <div className="flex justify-between items-center pt-4">
                    <p className="font-medium ">{partnerUser.nickname}</p>
                    <img src={CopySvg} />
                </div>
            </div>

            <div className="p-4 ">
                <div className="bg-side-300 h-[1px] w-full"></div>
            </div>

            <div className="flex justify-between items-center p-4">
                <div className="text-[#fff] font-normal">Notification</div>
                <div className="flex gap-2 cursor-pointer">
                    <div className="font-light text-[#a1a1a1]  ">Off</div>
                    <img src={NotificationOffSvg} className="" />
                </div>
            </div>

            <div className="p-4 ">
                <div className="bg-side-300 h-[1px] w-full"></div>
            </div>

            <div className="flex flex-col p-4 gap-2">
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex gap-2">
                        <img src={MeddiaSvg} />
                        <div className="text-[#fff] font-normal">Shared Media </div>
                    </div>
                    <span className="font-light">(0 Items)</span>
                </div>
            </div>

            <div className="p-4 ">
                <div className=" flex bg-side-200 rounded-full p-2 ">
                    <button className="text-[#fff]  font-light text-base rounded-full flex-1  outline-none hover:bg-gradient-to-r from-[#108DA6] to-[#47A4ED] p-2 ">Photos</button>
                    <button className="text-[#fff]  font-light text-base rounded-full flex-1  outline-none hover:bg-gradient-to-r from-[#108DA6] to-[#47A4ED] p-2 ">File</button>
                    <button className="text-[#fff]  font-light text-base rounded-full flex-1  outline-none hover:bg-gradient-to-r from-[#108DA6] to-[#47A4ED] p-2 ">Video</button>
                    <button className="text-[#fff]  font-light text-base rounded-full flex-1  outline-none hover:bg-gradient-to-r from-[#108DA6] to-[#47A4ED] p-2 ">Link</button>
                </div>
            </div>

            <div className="flex justify-between items-center p-4">
                <div className="flex  items-center gap-2">
                    <img src={MemberSvg} />
                    <div className="text-[#fff] font-normal">Members <span className="font-light">(2)</span></div>
                </div>
                <img src={PlusSvg} className="size-6" />
            </div>

            <div className="p-4 flex flex-col gap-3 overflow-y-auto h-100vh">
                <Memeber image={partnerUser.profile?.avatar?.[partnerUser.profile.avatar.length - 1]?.image} name={partnerUser.profile?.name} />
                <Memeber image={user.profile?.avatar?.[user.profile.avatar.length - 1]?.image} name={user.profile?.name} />
            </div>
        </div>
    )
}
