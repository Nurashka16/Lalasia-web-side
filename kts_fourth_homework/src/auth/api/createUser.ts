import axios from "axios";
import { ISignUp } from "../interface/ISignUp";

const createUser = async (data: ISignUp) =>
  (
    await axios.post("https://api.escuelajs.co/api/v1/users/", {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    })
  ).data;

export default createUser;
