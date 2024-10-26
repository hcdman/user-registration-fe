import { IRegisterForm } from "../types/user";
import AxiosClient from "./axios/axiosClient";

export const ApiRegisterUser = async (user: IRegisterForm) => {
    const res = await AxiosClient.post("/user/register", user)
    return res.data;
};