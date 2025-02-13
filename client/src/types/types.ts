export interface UserRegister {
  email: string | null;
  password: string | null;
  lastname: string | null;
  firstname: string | null;
  birthday: string | null;
  sex: string | null;
}

export interface TokenType {
  id: number;
  name: string;
  price: number;
  percent_price: number;
  image: string;
}

export interface FavoriteType {
  id: number;
  user_id: number;
  token_id: number;
}

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  sex: string;
}
