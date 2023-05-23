export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED',
}

export type CategoryItem = {//this is the basic item before putting into cart as well (before adding the quantity attributes)
  id: number;
  imageUrl: string;//item image
  name: string;
  price:number;
}

export type Category = {
  title: string;
  imageUrl: string;//category preview image
  items: CategoryItem[];
}

export type CategoryMap = {
  [key:string]: CategoryItem[]; // [key:string] ???
}