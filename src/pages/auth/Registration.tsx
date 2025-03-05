import { useState } from "react";
import "../../layouts/style.scss";
import LogoSvg from "../../assets/svg/logo_msg.svg"
import GoogleSvg from "../../assets/svg/google.svg"
import AppleSvg from "../../assets/svg/apple.svg"
import FacebookSvg from "../../assets/svg/facebook.svg"
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import {  ILogin, IReqRegister } from "../../interface/auth/auth";
import { authService } from "../../service/authService";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";



import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export const Registration = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");



  const [errorEmail ,setErrorEmail] = useState<boolean|string>(false);
  const [errorNickname ,setErrorNickname] = useState<boolean|string>(false);
  



  const register = async () => {
    validatorEmail(email)
    validatorNickname(nickname)
    const data:IReqRegister = {
      email,
      password,
      nickname
    }
    const res = await authService.register(data)
    if (res.status === 201){
      const data:ILogin = {email, password}
      const res = await authService.login(data)
      if (res.status === 200){
            cookies.set("access", res?.data.access);
            cookies.set("refresh", res?.data.refresh);
            localStorage.setItem("access", res?.data.access);
            localStorage.setItem("refresh", res?.data.refresh);
            navigate("/")
            window.location.reload();



      }
    }
  };


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validatorEmail = (text:string) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (! emailRegex.test(text)){
      setErrorEmail("Invalid form email")
    }
    else{
      setErrorEmail(false)
    }
    return text
  }

  const validatorNickname = (text:string) =>{
    const nicknameRegex = /^[a-zA-Z0-9._]{1,20}$/;
    if (! nicknameRegex.test(text)){
      setErrorNickname("Nickname can only contain letters, numbers, and the characters _ .")
    }
    else{
      setErrorNickname(false)
    } 
    return text

  }

 


  return (
    <div className="w-screen h-screen bg-primary-500">
      <div className="w-full h-full flex justify-between  ">
        <div className="w-3/5 h-full bg-side-100 flex justify-center items-center">
          <img src={LogoSvg} alt="logo" className="size-3/4"/>
        </div>
        <div className="w-2/5 h-full ">
          <div className="w-full h-full flex   justify-center items-center ">
            <div className="pl-2 pr-2 w-10/12 h-full ">
              <div className="h-1/6  pt-2 font-black text-4xl text-wrap text-center flex flex-wrap justify-center items-center">
                STAY CLOSE, NO MATTER THE DISTANCE
              </div>

              <div className="flex flex-col  gap-4 h-3/6 justify-center">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  className="text-lg"
                  value={email}
                  onChange={(e)=> setEmail(errorEmail ? validatorEmail(e.target.value): (e.target.value))}
                  placeholder="example@gmail.com"
                sx={{
                  "& .MuiInputLabel-root": { fontSize: 18 } ,input: { fontSize: 18 } 
                }}
                error={!!errorEmail}
                required
                />
                {errorEmail && <div className="text-danger-100 font-normal font-sans ">{errorEmail}</div>}
                <TextField
                  id="outlined-basic"
                  label="Nickname"
                  variant="outlined"
                  sx={{
                    "& .MuiInputLabel-root": { fontSize: 18 } ,input: { fontSize: 18 } 
                  }}
                  error={!!errorNickname}
                  value={nickname}
                  onChange={(e)=> setNickname(errorNickname ? validatorNickname(e.target.value): (e.target.value))}
                  required
                />
                  {errorNickname && <div className="text-danger-100 font-normal font-sans ">{errorNickname}</div>}
                <FormControl     sx={{
                    "& .MuiInputLabel-root": { fontSize: 18 } ,input: { fontSize: 18 } 
                  }} variant="outlined" required >
                <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end" >
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  label="Password"
                />
              </FormControl>
                <div className="flex pt-4   gap-2">
                  <p className="font-normal text-lg">You have account?</p>
                  <Link to={'/login'} className="font-normal text-lg  border-b   border-primary-100 ">Sign In</Link>
                </div>
             
                

                <button onClick={register}  className="outline-none rounded-xl bg-primary-100 p-3 text-primary-500 font-extrabold text-xl">
                  Sign Up
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
                    <img src= {GoogleSvg} alt ="google" className="w-6"/>
                    <div className="font-light">Sign Up with Google</div>
                  </button>
                  <button className=" w-full p-2  bg-[#101010] text-[#fff] text-lg  rounded-xl flex justify-center items-center gap-2">
                  <img src={AppleSvg} alt ="apple" className="w-6"/>                
                    <div className="font-light">Sign Up with Apple</div>
                  </button>
                  <button className=" w-full p-2  bg-[#3C5A9A] text-[#fff] text-lg  rounded-xl flex justify-center items-center gap-1">
                  <img src={FacebookSvg} alt ="facebook" className="w-6"/>
                    <div className="font-light">Sign Up with Facebook</div>
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
