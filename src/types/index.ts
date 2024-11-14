export interface Product {
  id: number;
  name: string;
  price: number;
}
export interface Profile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "female" | "male";
  image: string;
}
