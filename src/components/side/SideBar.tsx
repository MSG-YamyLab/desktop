import LogoSvg from "../../assets/svg/logo.svg";
import ChatSvg from "../../assets/svg/side/chat.svg";
import SavedSvg from "../../assets/svg/side/saved.svg";
import ChannelSvg from "../../assets/svg/side/chat_one.svg";
import ChatGroupSvg from "../../assets/svg/side/chat_group.svg";
import SettingsSvg from "../../assets/svg/side/settings.svg";
import LogoutSvg from "../../assets/svg/side/logout.svg";

import { Avatar } from "../avatar/Avatar";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { baseURL } from "../../constant";


type IProps = {
  setSettings: React.Dispatch<React.SetStateAction<boolean>>
  setContact: React.Dispatch<React.SetStateAction<boolean>>
}

export const SideBar:React.FC<IProps> = ({setSettings,setContact}) => {
  const cookies = new Cookies();
  const navigate = useNavigate()

  const logount = () => {
    localStorage.setItem("access", "");
    localStorage.setItem("refresh", "");
    navigate('/login')
  }
  const user = useAppSelector(state => state.auth)

  // const img =
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfqckLHj6RbxTwypldKX5jp3qLobH4ghdj32UoHpr6VcXJpGcd9WunPDShBOw8grN7fRU&usqp=CAU";
  return (
    <div className="w-[5%] h-full bg-side-100 flex flex-col items-center gap-2">
      <div id="logo" className="mt-4">
        <img src={LogoSvg} alt="logo" className="w-6" />
      </div>
      <div id="avatar" className="mt-4 cursor-pointer">
        <Avatar img={user.profile?.avatar[user.profile.avatar.length-1  ]?.image} size="w-14 h-14 " sizeBorder="w-16 h-16 " />
      </div>

      <div
        id="block-1"
        className="w-full flex flex-col  items-center justify-center gap-4 mt-6  pr-4 pl-4"
      >
        <div className="flex relative cursor-pointer ">
          <img src={ChatSvg} className="w-6" />
          <div className="absolute w-1 h-full bg-gradient-to-r from-[#108DA6] to-[#47A4ED] left-14 shadow-md"></div>
        </div>

        <div className="flex relative cursor-pointer ">
          <img src={SavedSvg} className="w-6" />
          <div className="hidden absolute w-1 h-full bg-gradient-to-r from-[#108DA6] to-[#47A4ED] left-14 shadow-md"></div>
        </div>

        <div className="w-full h-[1px] bg-side-300 mt-2"></div>
      </div>

      <div
        id="block-3"
        className="w-full flex flex-col  items-center justify-center gap-4 mt-4 pr-4 pl-4 "
      >
        <div className="flex relative cursor-pointer ">
          <img src={ChannelSvg} className="w-6" />
          <div className="hidden absolute w-1 h-full bg-gradient-to-r from-[#108DA6] to-[#47A4ED] left-14 shadow-md"></div>
        </div>

        <div className="flex relative cursor-pointer " onClick={() => setContact(true)}>
          <img src={ChatGroupSvg} className="w-6" />
          <div className="hidden absolute w-1 h-full bg-gradient-to-r from-[#108DA6] to-[#47A4ED] left-14 shadow-md"></div>
        </div>

        <div className="w-full h-[1px] bg-side-300 mt-2"></div>
      </div>
      <div
        id="block-finally"
        className="w-full flex flex-col  items-center justify-center gap-4 mt-4  pr-4 pl-4 "
      >
        <div className="flex relative cursor-pointer " onClick={() => setSettings(true)}>
          <img src={SettingsSvg} className="w-6" />
          <div className="hidden absolute w-1 h-full bg-gradient-to-r from-[#108DA6] to-[#47A4ED] left-14 shadow-md"></div>
        </div>

        <div onClick={logount} className="flex relative cursor-pointer ">
          <img src={LogoutSvg} className="w-6" />
          <div className="hidden absolute w-1 h-full bg-gradient-to-r from-[#108DA6] to-[#47A4ED] left-14 shadow-md"></div>
        </div>
      </div>
    </div>
  );
};
