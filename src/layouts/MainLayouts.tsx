import {useState, useEffect} from "react"
import "./style.scss";
import Cookies from "universal-cookie";
import { Panel } from "../components/panel/Panel";
import { SideBar } from "../components/side/SideBar";
import { Settings } from "../components/settings/Settings";
import { Profile } from "../components/profile/Profile";
import { ContactContainer } from "../components/contact/ContactContainer";
import { useAppDispatch } from "../hooks/reduxHooks";
import { authActions } from "../redux/slice/authSlice";
import { Image } from "../components/profile/Image";
import { Outlet } from "react-router-dom";
import { IChat, ITyped } from "../interface/chat/chat";
import { IUser } from "../interface/auth/auth";





export const MainLayouts = () => {
const cookies = new Cookies();
const [settings, setSettings] = useState<boolean>(false);
const [profile, setProfile] = useState<boolean>(false)
const [contact, setContact] = useState<boolean>(false);
const [image, setImage] = useState<boolean>(false)
const [IsTyping, setIsTyping] = useState<ITyped>()
const [chats, setChat] = useState<IChat[]>();
const [users, setUsers] = useState<IUser[]>()

const accessToken = localStorage.getItem("access");

const dispatch = useAppDispatch()

useEffect(() => {
  let socket: WebSocket;
  let reconnectInterval: any;


  const connectWebSocket = () => {
    socket = new WebSocket(`ws://192.168.1.5:8000/ws/users/status?token=${accessToken}`);

    socket.onopen = () => {
      clearInterval(reconnectInterval);
    };

    socket.onclose = () => {
      reconnectInterval = setTimeout(connectWebSocket, 3000);
    };

  };

  connectWebSocket();
  return () => {
    if (socket) socket.close();
  };
}, []);

useEffect(()=>{
  dispatch(authActions.getMe())

},[accessToken])



return (
    <>
    <div className="relative w-screen h-screen flex bg-side-100  ">
    <SideBar setSettings={setSettings} setContact={setContact}/>  
      <Panel /> 
     
     <Outlet   context={{users}}/>
    

      {settings && <Settings setSettings = {setSettings} setProfile={setProfile} />} 
      {profile && <Profile setImage={setImage} setProfile= {setProfile} setSettings = {setSettings}  />} 
      {contact && <ContactContainer setContact={setContact} />}
      
    </div>
  </>
  
  );
};
