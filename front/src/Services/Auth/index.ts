import Request from "../../libs/request";
import { RegisterProps, LoginProps } from "./types";

export const AuthRegister = async (data: RegisterProps) => {
    return Request().post("/auth/register", data).then((response) => response.data);
}

export const AuthLogin = async (data: LoginProps) => {
    return Request().post("/auth/login", data).then((response) => response.data);
}