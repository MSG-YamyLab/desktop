import { baseURL } from "../../constant"
import NoImage from "../../assets/image/bg_user.webp"

type IProps = {
    img?:string
    is_online?:boolean
}
export const User:React.FC<IProps> = ({img, is_online}) =>{
    return (
    <div className="relative">
        <img src={img? baseURL+img : NoImage} className="w-12 h-12 rounded-full object-cover   " alt="avatar"/>
{       is_online && <div className="absolute w-3 h-3 bg-panel-200 rounded-full left-9 bottom-[1px]  border-[1px] stroke-[#1C1C23] shadow-lg "></div>
}    </div>
    )
}