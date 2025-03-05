
import "../../layouts/style.scss"
// import Logo from "../../assets/svg/logo.svg"
import { Link } from "react-router-dom";


export const Auth = () => {
 

  return (
    <div className="w-screen h-screen color-bg flex  flex-col justify-evenly items-center">
        <div className="flex flex-col justify-center items-center gap-3">
          {/* <img src={Logo}/> */}
          <div className="text-primary-100 text-center">
             Live Easy, Stay <br /> in Control
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-4"> 
          <Link className="rounded-2xl border-[1px] border-[#BE6592] flex justify-center items-center w-4/6 p-4 text-primary-100" to="/login">SIGN IN</Link>
          <Link className="rounded-2xl border-0 bg-[#F9F3F3] flex justify-center items-center w-4/6 p-4" to="/register">SIGN UP</Link>
        </div>
    </div>
  );
};
