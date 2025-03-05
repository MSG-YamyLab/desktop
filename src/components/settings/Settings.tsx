import CloseSvg from "../../assets/svg/icon/close.svg"
import ProfileSvg from "../../assets/svg/icon/profile.svg"
import NotificationSvg from "../../assets/svg/notification.svg"
import LockSvg from "../../assets/svg/icon/lock.svg"
import LanguageSvg from "../../assets/svg/icon/language.svg"
import { useEffect, useRef} from "react"
import { useAppSelector } from "../../hooks/reduxHooks"
import { baseURL } from "../../constant"
import NoImage from "../../assets/image/bg_user.webp"

type IProps = {
    setSettings: React.Dispatch<React.SetStateAction<boolean>>
    setProfile: React.Dispatch<React.SetStateAction<boolean>>
}


export const Settings:React.FC<IProps> = ({setSettings, setProfile}) =>{
        const ref = useRef<HTMLDivElement>(null);
    

        useEffect(() => {
            const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setSettings(false);
            };
            document.addEventListener("mousedown", handleClick);
            return () => document.removeEventListener("mousedown", handleClick);
        }, [setSettings]);
    
    const user = useAppSelector(state =>state.auth)
    
    // const img = "https://i.mydramalist.com/EbqqQ_5c.jpg"
    const lastImage = user.profile?.avatar[user.profile.avatar.length-1]?.image
    return (
        <div className="absolute w-screen h-screen flex justify-center items-center " style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}>
        <div ref={ref} className="w-1/5 h-fit bg-side-100 p-4 rounded-lg">
            <div className="flex p-4 gap-2">
                <img src={CloseSvg} className="cursor-pointer" onClick={()=> setSettings(false)}/>
                <div className="text-[#fff] font-normal text-lg">Settings</div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
                <img src={lastImage? baseURL+lastImage : NoImage} className="w-24 h-24 rounded-full object-cover"/>               
                <div className="text-[#fff] font-medium text-lg">{user.profile?.name} {user.profile?.surname}</div>
                <p className="font-light">{user.nickname}</p>
            </div>

            <div className="flex flex-col  justify-start p-4">
                <button onClick = {() => {setProfile(true)
                    setSettings(false)
                }} className="flex gap-2 w-full hover:bg-side-200 p-4" >
                    <img src={ProfileSvg}/>
                    <div className="text-[#fff] font-normal">Profile</div>
                </button>
                <button className="flex gap-2 w-full hover:bg-side-200 p-4">
                    <img src={NotificationSvg}/>
                    <div className="text-[#fff] font-normal">Notifications</div>
                </button>
                <button className="flex gap-2 w-full hover:bg-side-200 p-4">
                    <img src={LockSvg}/>
                    <div className="text-[#fff] font-normal">Security</div>
                </button>
                <button className="flex gap-2 w-full hover:bg-side-200 p-4">
                    <img src={LanguageSvg}/>
                    <div className="text-[#fff] font-normal">Language</div>
                </button>

            </div>
        </div>
      </div>
      
    )
}