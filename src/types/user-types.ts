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
