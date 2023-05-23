import { CategoryItem } from "../categories/categories.types";

//define enum is like a object with = statements
export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  //set count
  //set total price
}

export type CartItem = CategoryItem & {//intersection type
  quantity: number;
}