import { ProfileImages } from "./ProfileImages";
import BackSvg from "../../assets/svg/icon/arrow-back.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { authActions } from "../../redux/slice/authSlice";

type IProps = {
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setImage:React.Dispatch<React.SetStateAction<boolean>>;
};

export const Profile: React.FC<IProps> = ({ setSettings, setProfile,setImage }) => {
  const user = useAppSelector((state) => state.auth); 
  const dispatch = useAppDispatch();

  const [bio, setBio] = useState<string>(user.profile?.bio || "");
  const [name, setName] = useState<string>(user.profile?.name || "");
  const [surname, setSurname] = useState<string>(user.profile?.surname || "");
  const [username, setUsername] = useState<string>(user.nickname || "");
  const [birthday, setBirthday] = useState<string>(user.profile?.birthday || "");
  const [change, setChange] = useState<boolean>(false)

  // useEffect(() => {
  //   setBio(user.profile?.bio || "");
  //   setName(user.profile?.name || "");
  //   setSurname(user.profile?.surname || "");
  //   setUsername(user.nickname || "");
  //   setBirthday(user.profile?.birthday || "");
  // }, [user]); 


  // useEffect(()=>{
  //   if(bio === user.profile?.bio && name === user.profile?.name && surname === user.profile?.surname && username === user.nickname && birthday === user.profile?.birthday ){
  //     setChange(false)
  //   }
  // },[bio, name, surname, username,birthday, change])

  const handleChangesName= (value:string) =>{
    setName(value);
    setChange(true)
  }

  const handleChangesSurname= (value:string) =>{
    setSurname(value);
    setChange(true)

  }

  const handleChangesNickname= (value:string) =>{
    setUsername(value);
    setChange(true)

  }

  const handleChangesBio= (value:string) =>{
    setBio(value);
    setChange(true)

  }

  const handleChangesBirthDay= (value:string) =>{
    setBirthday(value);
    setChange(true)
  }

  const submitUpdateData = () =>{
    const data = {
    'profile':{

      'bio':bio,
      'surname':surname,
      'name':name,
    },
    // 'birthday':birthday,
    'nickname':username,
    }
    
    dispatch(authActions.updateUser(data))
    setChange(false)
  }

  return (
    <div
      className="absolute w-screen h-screen flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
    >
      <div className="w-1/5 h-fit bg-side-100 p-4 rounded-lg">
        <div className="flex gap-2 p-4">
          <img
            onClick={() => {
              setProfile(false);
              setSettings(true);
            }}
            src={BackSvg}
            className="cursor-pointer"
          />
          <div className="text-[#fff] font-normal text-lg">Profile</div>
        </div>

        <div id="profile-images" className="flex flex-col gap-2 items-center">
            <div onClick={()=>setImage(true)} className="cursor-pointer">

            <ProfileImages />
            </div>
          <div className="text-[#fff] font-normal text-lg">
            {name} {surname}
          </div>
        </div>

        <div className="flex justify-between items-center p-4">
          <textarea
            value={bio}
            onChange={(e) => handleChangesBio(e.target.value)}
            className="w-full bg-transparent p-1 font-normal text-[#fff] outline-none"
            placeholder="Bio"
          />
        </div>

        <div className="w-full bg-side-300 h-[1px]"></div>

        <div className="flex justify-between items-center p-4">
          <div className="text-primary-500 font-normal">Name</div>
          <input
            value={name}
            onChange={(e) => handleChangesName(e.target.value)}
            className="w-2/3 bg-side-300 rounded-full p-1 font-normal text-[#fff] outline-none text-center"
            placeholder="John"
          />
        </div>

        <div className="flex justify-between items-center p-4">
          <div className="text-primary-500 font-normal">Surname</div>
          <input
            value={surname}
            onChange={(e) => handleChangesSurname(e.target.value)}
            className="w-2/3 bg-side-300 rounded-full p-1 font-normal text-[#fff] outline-none text-center"
            placeholder="Doe"
          />
        </div>

        <div className="flex justify-between items-center p-4">
          <div className="text-primary-500 font-normal">Username</div>
          <input
            value={username}
            onChange={(e) => handleChangesNickname(e.target.value)}
            className="w-2/3 bg-side-300 rounded-full p-1 font-normal text-[#fff] outline-none text-center"
            placeholder="@Yamy"
          />
        </div>

        <div className="flex justify-between items-center p-4">
          <div className="text-primary-500 font-normal">Birthday</div>
          <input
            value={birthday}
            onChange={(e) => handleChangesBirthDay(e.target.value)}
            type="date"
            className="w-2/3 bg-side-300 rounded-full p-1 font-normal text-[#fff] outline-none text-center"
          />
        </div>
        {change && 
        <div className="p-4 pt-2 pb-2">

        <button onClick={() => submitUpdateData()} className="bg-panel-200 p-1 w-1/2 rounded-lg font-normal ">Save</button>
        </div>
        }
      </div>
    </div>
  );
};
