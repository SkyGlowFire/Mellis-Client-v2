import {ICategory} from './categories'
import { Media } from './files'
import { ILook } from './looks'

export type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
export type Color = "black" | "blue" | "brown" | "green" | "grey" | "orange" | "red" | "white" | "yellow"

export interface IProduct{
    _id: string
    title: string
    enable: boolean
    description: string
    category: string
    image: Media
    media: Media[]
    sizes: Size[]
    color: Color
    brand: string
    weight: number
    path: string[]
    pathString: string
    sku: string
    relatedProducts: string[]
    price: number
    comparePrice: number
    bulkDiscountEnable: boolean
    bulkDiscountQty: number
    bulkDiscountPrice: number
    looks: ILook[]
}

export interface IProductPopulated extends Omit<IProduct, 'category' | 'relatedProducts'> {
    category: ICategory
    relatedProducts: IProduct[]
}