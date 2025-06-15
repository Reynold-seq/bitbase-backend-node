import mongoose from "mongoose";

interface IContext {
  _id: mongoose.Types.ObjectId;
  email: string;
  firstname: string;
  lastname: string;
  mobile: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      ctx: IContext;
    }
  }
}

export interface IUser {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  mobile: string;
  role: string;
  blocked: boolean;
}

export interface IFoodProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  starRating: number;
  available: boolean;
  vegetarian: boolean;
  discount: number;
  ingredients: string[];
}

export interface ICartProduct {
  product: IFoodProduct;
  count: number;
  price: number;
}

export interface ICart {
  products: ICartProduct[];
  cartTotal: number;
  orderBy: IUser;
}
