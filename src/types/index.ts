export type Product = {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  images: string[];
};

export type Category = {
  id: number;
  name: string;
  image: string;
  slug: string;
};

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role?: string;
  avatar?: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};
