import React from "react";
import axios from "axios";
import ISignIn from "../interface/ISignIn/ISignIn";

const getToken = async (data:ISignIn) =>
  (
    await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
      email: data.email,
      password: data.password,
      
    })
  ).data.access_token;

export default getToken;
