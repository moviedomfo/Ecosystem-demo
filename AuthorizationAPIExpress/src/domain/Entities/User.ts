export interface User {
  id: string;
  email: string;
  userName: string;
  pwd: string;
  status?: "Active" | "Desactive" | "Looked";
  phoneNumbers: string[];
  roles?: string[];
}
