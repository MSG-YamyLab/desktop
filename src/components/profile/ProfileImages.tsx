import { useRef } from "react";
import PlusSvg from "../../assets/svg/icon/plus.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IAvatar } from "../../interface/auth/auth";
import { authActions } from "../../redux/slice/authSlice";
import { baseURL } from "../../constant";
import NoImage from "../../assets/image/bg_user.webp"
export const ProfileImages = () => {
  const img: IAvatar[] | undefined = useAppSelector(
    (state) => state.auth.profile?.avatar
  );
  const lastImage = img && img.length > 0 ? img[img.length - 1].image : "";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch()
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
    const formData = new FormData();
    formData.append('image', file); 



      dispatch(authActions.addAvatarUser(formData))
    }
  };

  return (
    <>
      <div className="relative w-fit h-fit">
        <img src={lastImage? baseURL + lastImage :NoImage } className="w-28 h-28 rounded-full object-cover " />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <img
          onClick={handleSelectFile}
          src={PlusSvg}
          className="w-8 h-8 absolute bottom-0 right-1 stroke-[#1C1C23] shadow-sm  cursor-pointer hover:scale-105 "
        />
      </div>
    </>
  );
};
