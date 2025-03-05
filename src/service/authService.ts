import { urls } from "../constant";
import { ILogin, IToken, IUser,  IResRegister, IReqRegister } from "../interface/auth/auth";
import { IChat } from "../interface/chat/chat";
import { apiService,authApiSerivice } from "./apiService";

export const authService = {
  getMe: () => apiService.get<IUser>(`${urls.auth}/me`),
  login: (data: ILogin) => authApiSerivice.post<IToken>(`${urls.auth}/login`, data),
  register: (data: IReqRegister) => authApiSerivice.post<IResRegister>(`${urls.user}/register`, data),
  avatarAdd: (data:string) => apiService.post<IUser>(`${urls.user}/avatar/add`, data),
  // profile: (data: any) => apiService.patch<IUser>(`${urls.user}/profile/update`, data),
  user:(data:any) => apiService.patch<IUser>(`${urls.user}/user/update`, data),
  findUser: (data:any) => apiService.post<IUser[]>(`${urls.user}/find/nickname`, data),
  addUserByContact: (data:any) => apiService.post<IUser>(`${urls.user}/contact/add`, data),
  delUserByContact: (data:any) => apiService.post<IUser>(`${urls.user}/contact/del`, data),
  getChatById: (id:string) => apiService.get<IChat>(`${urls.chat}/my/${id}`),
  createChatById: (data:any) => apiService.post<IChat>(`${urls.chat}/create`, data),
  deleteChatById: (id:number) =>apiService.delete<IChat>(`${urls.chat}/delete/${id}`)
};
