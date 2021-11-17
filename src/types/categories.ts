
import {IProduct} from './products'

export interface ICategory{
    id: string
    _id: string
    title: string
    text: string
    level: number
    parents: string[]
    children: ICategory[]
    path: string[]
    products: string[]
    totalProducts: number
    bestseller: IProduct
}