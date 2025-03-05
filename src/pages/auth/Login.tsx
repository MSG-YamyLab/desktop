import { useState } from "react";
import "../../layouts/style.scss";
import LogoSvg from "../../assets/svg/logo_msg.svg";
import GoogleSvg from "../../assets/svg/google.svg";
import AppleSvg from "../../assets/svg/apple.svg";
import FacebookSvg from "../../assets/svg/facebook.svg";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { authService } from "../../service/authService";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Checkbox from "@mui/material/Checkbox";
import { ILogin } from "../../interface/auth/auth";

export const Login = () => {
  const navigate = useNavigate();


  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const data: ILogin = { email, password };
    const res = await authService.login(data);
    if (res.status == 200) {
      cookies.set("access", res?.data.access);
      cookies.set("refresh", res?.data.refresh);
      localStorage.setItem("access", res?.data.access);
      localStorage.setItem("refresh", res?.data.refresh);
      navigate('/')   
      window.location.reload();
      
    }
  };

  

  return (
    <div className="w-screen h-screen bg-primary-500">
      <div className="w-full h-full flex justify-between  ">
        <div className="w-3/5 h-full bg-side-100 flex justify-center items-center">
          <img src={LogoSvg} className="size-3/4" />
        </div>
        <div className="w-2/5 h-full ">
          <div className="w-full h-full flex   justify-center items-center ">
            <div className="pl-2 pr-2 w-10/12 h-full ">
              <div className="h-1/6  font-black text-4xl text-wrap text-center flex flex-wrap justify-center items-center">
                 
              </div>

              <div className="flex flex-col  gap-4 h-3/6 justify-center">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  className="text-lg"
                  sx={{
                    "& .MuiInputLabel-root": { fontSize: 18 },
                    input: { fontSize: 18 },
                  }}
                  required={true}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  type="password"
                  sx={{
                    "& .MuiInputLabel-root": { fontSize: 18 },
                    input: { fontSize: 18 },
                  }}
                  required={true}
                />
                <div className="flex pt-4   gap-2">
                  <p className="font-normal text-lg">You have account?</p>
                  <Link
                    to={"/register"}
                    className="font-normal text-lg  border-b   border-primary-100 "
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="flex pt-2 pb-4 justify-between  ">
                  <div className="flex justify-center items-center gap-1">
                    <Checkbox defaultChecked />
                    <p className="font-normal text-lg">Remember me</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <a className=" font-normal text-lg border-b border-primary-100 ">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <button onClick={login}  className="outline-none rounded-xl bg-primary-100 p-3 text-primary-500 font-extrabold text-xl">
                  Sign In
                </button>
              </div>
              <div className="h-2/6 flex flex-col ">
                <div className="flex justify-center items-center gap-2">
                  <div className="bg-primary-100 w-full h-[1px]"></div>
                  <div className="font-extralight text-lg">OR</div>
                  <div className="bg-primary-100 w-full h-[1px]"></div>
                  <div />
                </div>
                <div className="flex flex-col justify-end gap-4 pt-8 ">
                  <button className=" w-full  p-2  bg-[#ffffff] text-[#000] text-lg  rounded-xl flex justify-center items-center gap-2">
                    <img src={GoogleSvg} className="w-6" />
                    <div className="font-light">Sign In with Google</div>
                  </button>
                  <button className=" w-full p-2  bg-[#101010] text-[#fff] text-lg  rounded-xl flex justify-center items-center gap-2">
                    <img src={AppleSvg} className="w-6" />
                    <div className="font-light">Sign In with Apple</div>
                  </button>
                  <button className=" w-full p-2  bg-[#3C5A9A] text-[#fff] text-lg  rounded-xl flex justify-center items-center gap-1">
                    <img src={FacebookSvg} className="w-6" />
                    <div className="font-light">Sign In with Facebook</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
