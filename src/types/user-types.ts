export interface UserRegister {
  username: string;
  password: string;
  email: string;
  avatar: File;
}

export interface UserLogin {
  password: string;
  email: string;
}

export interface User {
  avatar: null | File;
  blocked: string[];
  email: string;
  id: string;
  username: string;
}
