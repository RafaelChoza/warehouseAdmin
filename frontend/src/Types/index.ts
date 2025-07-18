export type ProductType = {
    id?: number,
    name: string,
    description: string,
    vendor: string,
    quantity: number,
    quantityKanban: number,
    price: number,
    mro?: string,
    createdAt?: string,
}


export type UserType = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
}

export type UserRequestFormType = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string,
    role: string;

}

export type LoginUserType = {
    username: string;
    password: string;
}

export type CartItemType = {
  id: string | number;
  product: {
    name: string;
    [key: string]: any;
  };
  quantity: number;
  [key: string]: any;
};

export type CartType = {
  items: CartItemType[];
  [key: string]: any;
};

export type CartTypeWithMachine = CartItemType & {
  idMachine: string
}

export type OrderType = {
  id?: number,
  user: UserType,
  items: OrderItemType[],
  active: boolean,
  delivered: boolean,
}

export type OrderItemType = {
  id?: number,
  product: ProductType,
  quantity: number,
  forMachine: string,
}