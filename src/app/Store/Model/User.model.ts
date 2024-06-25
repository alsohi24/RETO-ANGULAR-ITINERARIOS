import { EntityState } from '@ngrx/entity';

export interface Users {
  username: string;
  password: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

export interface Usercred {
  username: string;
  password: string;
}

export interface Userinfo {
  _id: number;
  username: string;
  name: string;
  role: string;
  status: boolean;
}

export interface UserSession {
  access_token: number;
  user: Userinfo;
}

export interface Roles {
  code: string;
  name: string;
}

export interface Menus {
  code: string;
  name: string;
}

export interface Roleaccess {
  role: string;
  menu: string;
}

export interface UserModel extends EntityState<Users> {
  isDuplicate: boolean;
  menulist: Roleaccess[];
  roles: Roles[];
  userinfo: Userinfo;
}
