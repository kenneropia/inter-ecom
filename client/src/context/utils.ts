import { AxiosResponse } from "axios";
import { add, getTime } from "date-fns";
import API from "../api";
import { z } from "zod";

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  if (!user || Date.now() > user.jwt_expired_at) {
    return null;
  } else if (user) {
    return user;
  }
};
export type User = {
  name: string;
  email: string;
  id: string;
  token: string;
  password: string;
};
const loginUser = async (loginData: { email: string; password: string }) => {
  const {
    data: { name, id, email, token },
  } = await API.post("/user/login", loginData);
  console.log(name);
  let user = {
    name: name,
    id,
    email,
    token: token,
    jwt_created_at: Date.now(),
    jwt_expired_at: getTime(add(Date.now(), { days: 29 })),
  };

  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const signup = async (signinData: User) => {
  let { data } = await API.post<User>("/user/signup", signinData);

  return data;
};

export const login = async (loginData: { email: string; password: string }) => {
  let user = await loginUser(loginData);
  return user;
};

export const logOut = () => localStorage.removeItem("user");
