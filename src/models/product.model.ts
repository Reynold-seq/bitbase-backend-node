import mongoose from "mongoose";
import { IFoodProduct } from "../types";

interface IProductSchema extends IFoodProduct, Document {}

const productSchema = new mongoose.Schema<IProductSchema>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    starRating: {
      type: Number,
      default: 1,
      max: 5,
    },
    available: {
      type: Boolean,
      default: true,
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
    },
    ingredients: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProductSchema>("Product", productSchema);
