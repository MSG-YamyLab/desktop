import { IUser } from "../auth/auth";

export interface IMessage {
    id: number,
    chat: number|null,
    chat_group: number|null,
    content: string,
    owner: IUser,
    is_read: boolean,
    delete_me: null|number
    create_at: string,
}