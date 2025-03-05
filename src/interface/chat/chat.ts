import { IUser } from "../auth/auth";
import { IMessage } from "../message/message";

export interface IChat {
    id:number,
    users:IUser[],  
    update_at:string,
    message?:IMessage
    typed?:Array<number>

}

export interface ITyped {
    id:number
    status:boolean
}