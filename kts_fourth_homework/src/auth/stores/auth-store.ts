import { makeAutoObservable, runInAction } from "mobx";
import getToken from "../api/getToken";
import getUser from "../api/getUser";
import createUser from "../api/createUser";
import { IUser } from "../interface/IUser";
import { ISignUp } from "../interface/ISignUp";
import ISignIn from "../interface/ISignIn/ISignIn";

class AuthStore {
  isAuth: boolean = false;
  isLoading: boolean = false;
  token: string = "";
  user: IUser = {
    email: "",
    name: "",
    role: "",
    avatar: "",
    id: "",
  };
  constructor() {
    makeAutoObservable(this);
  }
  setIsAuth = (boolean: boolean) => {
    this.isAuth = boolean;
  };

  signIn = async (data: ISignIn) => {
    try {
      const token = await getToken(data);
      const response = await getUser(token);
      runInAction(() => {
        this.token = token;
        this.user = {
          email: response.email,
          name: response.name,
          role: response.role,
          avatar: response.avatar,
          id: response.id,
        };
        this.isAuth = true;
      });
    } catch {
      throw new Error("Ввели неправильный пароль или логин");
    }
  };
  signUp = async (data: ISignUp) => {
    try {
      const response = await createUser(data);

      console.log(response);
    } catch {
      throw new Error("Вы неправильно заполнили данные");
    }
  };
}
export default new AuthStore();
