import React from "react";
import axios from "axios";

const config = {
  method: "get",
  url: "https://api.escuelajs.co/api/v1/auth/profile",
  headers: {
    Authorization: "",
  },
};
const getUser = async (
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg"
) => {
  Object.defineProperty(config.headers, "Authorization", {
    value: `Bearer ${token}`,
  });
  let data = {};
  return await axios(config).then((response) => {
    return (data = {
      email: response.data.email,
      name: response.data.name,
      role: response.data.role,
      avatar: response.data.avatar,
      id: response.data.id,
    });
  });
};

export default getUser;
