export interface User {
  email: string;
  name: string;
  id: string;
}


export interface SignUp {
    id:string,
    name:string,
    email:string,
    password:string
}

export interface SignIn {
    email: string,
    token:string
}