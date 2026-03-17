
export type Product = {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  images: string[];

 
}

export type Category ={
    id: number;
    name: string;
    image: string;
    slug: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
}



