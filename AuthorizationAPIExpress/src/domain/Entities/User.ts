// export interface User {
//   id: string;
//   userName: string;
//   email: string;
//   password: string;
//   status?: "Active" | "Desactive" | "Looked";
//   lastName: string;
//   name: string;
//   roles?: string[];
//   avatar:string;

// }
export interface User {
  id: string;
  userName: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  roles: string[];
}

export interface MokUsers {
  Users: User[];
}
