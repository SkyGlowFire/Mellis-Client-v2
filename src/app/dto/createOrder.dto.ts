import { IOrderItem } from "~/types/orders";

interface NewOrderItem extends Omit<IOrderItem, 'product'>{
    product: string
}

export interface CreateOrderDto{
    items: NewOrderItem[]
    price: number
    address: string
}