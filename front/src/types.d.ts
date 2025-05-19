export interface IUser {
  _id: string;
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface ILoginMutation {
  username: string;
  password: string;
}

export interface IRegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IGlobalError {
  error: string;
}
