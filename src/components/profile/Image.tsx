import { baseURL } from "../../constant";
import { useAppSelector } from "../../hooks/reduxHooks";
import LeftSvg from "../../assets/svg/icon/direct-left.svg"
import RightSvg from "../../assets/svg/icon/direct-right.svg"
import TrashSvg from "../../assets/svg/icon/trash.svg"
import { useEffect,  useState } from "react";
import CloseSvg from "../../assets/svg/icon/close.svg"
type IProps = {
    setImage: React.Dispatch<React.SetStateAction<boolean>>;
  };
export const Image:React.FC<IProps> = ({setImage}) => {
    const [number, SetNumber] = useState<number>(0)
    const [max, SetMax] = useState<number>(0)
    const avatar = useAppSelector(state => state.auth.profile?.avatar)
    useEffect(()=>{
        SetMax(avatar?.length||0)
        SetNumber(0)
    }, [avatar])
    const nextImage = () => {
        SetNumber(prev=>prev+1 < max ? prev+1 : 0)
    }
    const prevImage = () =>{
        SetNumber(prev=>prev-1 >= 0 ? prev-1 : max-1)
    }
    return (
    <div
   
      className="absolute w-screen h-screen flex justify-evenly items-center p-2"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
    >
        <img onClick={prevImage} src={LeftSvg} alt = "btn left" className="w-16 hover:-translate-x-1 cursor-pointer"/>
      <div  className="w-4/5 h-5/6  ">
{       avatar && <img src={baseURL+ avatar[number]?.image} alt="avatar" className="object-cover w-full h-full"/>}
      </div>
      <img onClick={nextImage} src={RightSvg} alt="btn right" className="w-16 hover:translate-x-1 cursor-pointer"/>
        <img src={TrashSvg} alt="del  img" className="absolute bottom-5 right-5 w-10 cursor-pointer"/>
        <img src={CloseSvg} alt="close" className="absolute top-3 right-3 w-8 cursor-pointer" onClick={() => setImage(false)}/>
    </div>
  );
};
