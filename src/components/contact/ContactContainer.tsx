import { User } from "../avatar/User"
import CloseSvg from "../../assets/svg/icon/close.svg"
import CreateSvg from "../../assets/svg/panel/new_message.svg"
import { useEffect, useRef, useState } from "react"
import { Contact } from "./Contact"
import { authService } from "../../service/authService"
import { IUser } from "../../interface/auth/auth"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import AddUserSvg from "../../assets/svg/icon/add-square.svg"
import MinusUserSvg from "../../assets/svg/icon/minus-square.svg"
import MessageSvg from "../../assets/svg/icon/message.svg"
import { authActions } from "../../redux/slice/authSlice"
import { useNavigate } from "react-router-dom"

type IProps = {
  setContact: React.Dispatch<React.SetStateAction<boolean>>
}

export const ContactContainer: React.FC<IProps> = ({ setContact }) => {
  const [search, setSearch] = useState<string>("")
  const [userData, setUserData] = useState<IUser[] | null>(null) // Explicit null initialization
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setContact(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [setContact])

  const searchUser = async (value: string) => {
    setSearch(value)
    if (value === "") {
      setUserData(null)
    } else {
      const res = await authService.findUser({ 'nickname': value })
      if (res.status === 200) {
        setUserData(res.data)
      }
    }
  }

  const createChat = async (id:number) => {
    const res = await authService.createChatById({user_id:id})
    if (res.status === 201){
      const chatId = res.data.id
      setContact(false)
      navigate(`/chat/${chatId}`)
    }  
  }


  const addUserByContact = async (id: number) => {
    dispatch(authActions.addContactUser({ id }))
  }

  const delUserByContact = async (id: number) => {
    dispatch(authActions.delContactUser({ id }))
  }

  const userContact:any = useAppSelector(state => state.auth.contacts)

  return (
    <div className="absolute w-screen h-screen flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}>
      <div ref={ref} className="w-1/5 h-fit bg-side-100 p-4 rounded-lg">
        <div className="flex justify-between items-center p-2 gap-2">
          <div className="flex gap-2">
            <img className="cursor-pointer" src={CloseSvg} alt="icon close" onClick={() => setContact(false)} />
            <div className="text-[#fff] font-normal text-lg">Contact</div>
          </div>
          <img className="cursor-pointer" src={CreateSvg} alt="add user contact" />
        </div>

        <div id="Search-Contact" className="pr-2 pl-2 pb-4 pt-2">
          <input value={search} onChange={(e) => searchUser(e.target.value)}
            className="w-full p-4 rounded-lg bg-side-200 outline-none text-[#fff] font-normal placeholder:text-side-300"
            placeholder="Search contacts" />
        </div>

        <div>
          {userData ? (
            <div className="flex flex-col p-4 h-[60vh] overflow-y-scroll">
              {userData.map(user => (
                <div key={user.id}  className="flex justify-between items-center w-full " >
                  <div className="flex gap-2"   >

                    <User img={user.profile?.avatar?.[user.profile?.avatar.length - 1]?.image ?? ''}
                      is_online={false} />
                    <div className="flex flex-col pt-1 pb-1">
                      <div className="font-normal text-[#fff]">
                        {user.profile?.name} {user.profile?.surname}
                      </div>
                      <div className="font-light text-[#1C92B5]">{user.nickname}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center ">

                  <img src={MessageSvg} className="cursor-pointer" alt="add msg" onClick={() => createChat(user.id)}/>
                  {!userContact?.includes(user.id) && 
                    <img src={AddUserSvg} className="cursor-pointer" alt="add user" onClick={() => addUserByContact(user.id)} />}
                  {userContact?.includes(user.id) && 
                    <img src={MinusUserSvg} className="cursor-pointer" alt="del user" onClick={() => delUserByContact(user.id)} />}

              
                  </div>
                </div>
              ))}
            </div>  
          ) : (
            <div className="flex flex-col gap-2 p-4 h-[60vh] overflow-y-scroll">
              <Contact setContact={setContact} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
