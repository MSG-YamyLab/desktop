import NoImage from "../../assets/image/bg_user.webp"
import { baseURL } from "../../constant"

type IProps = {
    img:string|undefined
    style?:string
    size:string
    sizeBorder:string
}

export const Avatar:React.FC<IProps> = ({img,size, sizeBorder}) => {
return  (<>
        <div className={`${sizeBorder}  rounded-full bg-transparent  flex justify-center items-center border-2 border-purple-100`}>
            <img src={img? baseURL + img: NoImage} className={`${size} rounded-full object-cover`} alt="avatar"/>
        </div>

       
    </>)

}