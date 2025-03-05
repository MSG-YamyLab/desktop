import { User } from "../avatar/User";
import { IMessage } from "../../interface/message/message";
import { useAppSelector } from "../../hooks/reduxHooks";

type IProps = {
  msg: IMessage;
};
export const Message: React.FC<IProps> = ({ msg }) => {
  const user = useAppSelector((state) => state.auth);
  return (
    <>
      {user.id !== msg.owner.id && (
        <div className="flex gap-4">
          <div className="scale-110">
            <User 
                img = {msg.owner.profile?.avatar[msg.owner.profile.avatar.length-1]?.image}
            />
          </div>
          <div className="flex flex-col gap-1 w-fit max-w-[60%] ">
            <div className=" flex justify-between gap-6 items-center pr-4">
              <div className="text-[#fff] font-normal">
                {msg.owner.profile?.name} {msg.owner.profile?.surname}
              </div>
              <div className="text-side-300 font-normal text-sm">
                {msg?.create_at &&
                  new Intl.DateTimeFormat("uk-UA", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(msg?.create_at))}
              </div>
            </div>
            <div className="relative pl-6 pr-6 pt-4 pb-4 w-fit  bg-[#1E1E25] rounded-3xl rounded-tl-none text-[#fff] font-normal">
              {msg.content}
              {/* <div className="absolute right-2 bottom-2">
                <img src={ReadSvg} />
              </div> */}
            </div>
          </div>
        </div>
      )}

      {user.id === msg.owner.id && (
        <div className="w-full flex justify-end">
          <div className="flex flex-col gap-2 w-fit max-w-[60%]">
            <div className="flex justify-end gap-2 items-end">
              <div className="text-[#fff] font-normal"> </div>
              <div className="text-side-300 font-normal">
                {" "}
                {msg?.create_at &&
                  new Intl.DateTimeFormat("uk-UA", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(msg?.create_at))}
              </div>
              <div className="scale-90">
                <User
                  img={
                    user.profile?.avatar[user.profile?.avatar.length - 1]?.image
                  }
                />
              </div>
            </div>
            <div>
              <div className="relative pl-6 pr-6 pt-4 pb-4   gradient    rounded-3xl rounded-tr-none text-[#fff] font-normal">
                {msg.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
