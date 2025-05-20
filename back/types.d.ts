import { WebSocket } from 'ws';
export interface IUserField {
  username: string;
  password: string;
  role: string;
  token: string;
  avatar: string;
  __confirmPassword: string;
}

export interface IOnlineUser {
  userId: string;
  ws: WebSocket;
  username: string;
  avatar?: string;
}
