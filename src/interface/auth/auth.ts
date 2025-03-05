export interface IAvatar {
  image:string
}

export interface IProfile {
  id: number,
  name: string,
  surname: string,
  birthday: string,
  bio: string,
  avatar: IAvatar[]
}


export interface IUser {
  id: number ;
  email: string;
  phone: string,
  nickname: string,
  is_active: boolean,
  is_block: boolean,
  is_superuser: boolean,
  is_staff: boolean,
  is_online: boolean,
  profile?: IProfile
  contacts?: IUser[]
}



export interface IToken {
  access: string;
  refresh: string;
}

export interface IResToken {
  user: IUser | null;
}

export interface ILogin {
  email: string;
  password: string;
}


export interface IProfile {
  name:string,
  surname:string,
}



export interface IReqRegister {
  email: string;
  password: string;
  nickname:string
}

export interface IResRegister {
  id:number,
  email: string;
  nickname:string
}



