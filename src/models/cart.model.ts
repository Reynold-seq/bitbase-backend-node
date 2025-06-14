import mongoose from "mongoose";
import { ICart } from "../types";

interface ICartSchema extends ICart, Document {}

const cartSchema = new mongoose.Schema<ICartSchema>(
  {
    products: [
      {
        products: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        price: Number,
      },
    ],
    cartTotal: Number,
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model<ICartSchema>("Cart", cartSchema);
