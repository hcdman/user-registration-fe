export interface IRegisterForm {
    userName: string;
    email: string;
    password: string;
}
export interface ILoginForm {
    userName: string;
    password: string;
}

export interface User {
    username: string;
    email: string;
    createdAt: Date;

}