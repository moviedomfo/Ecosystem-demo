
export interface User {
  id: string;
  userName: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordHash: string;
  avatar: string;
  roles: string[];
}

export interface MokUsers {
  Users: User[];
}
