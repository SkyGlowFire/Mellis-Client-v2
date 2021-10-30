import { IProduct } from "./products";
import { Address } from "./user";

export type OrderStatus = 'pending' | 'processing' | 'deliver' | 'done' | 'returned'

export interface IOrderItem{
    title: string
    size: string
    color: string
    price: number
    qty: number
    product: IProduct
}

export interface IOrder{
    _id: string
    address: Address
    user: string
    email: string
    items: IOrderItem[]
    price: number
    status: OrderStatus
    createdAt: Date
}