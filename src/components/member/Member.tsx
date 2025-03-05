import { User } from "../avatar/User"


type IProps = {
    image:string | undefined
    name:string | undefined
}
export const Memeber:React.FC<IProps> = ({image, name}) => {
    return (
        <div className="flex justify-between items-center ">
            <div className="flex items-center gap-2">
                <div className="scale-90">
                    <User img={image}/>
                </div>
                <div className="text-[#fff] font-normal text-lg">{name}</div>
            </div>
            {/* <button className="font-light text-[#fff]   bg-gradient-to-r from-[#108DA6] to-[#47A4ED]   pr-2 pl-2 p-1 rounded-full">Owner</button> */}
        </div>
    )
}