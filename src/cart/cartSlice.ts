import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProductPopulated, Size } from '~/types/products';
import { Address } from '~/types/user';
import * as uuid from 'uuid'

export interface CartItem{
    id: string
    product: IProductPopulated | IProduct
    qty: number, 
    price: number
    size: Size
}

interface AddCartItemPops{
    product: IProductPopulated | IProduct
    size: Size
}

interface CartState{
    items: CartItem[]
    totalPrice: number
    paymentMethod: string | null
    address: Address | null
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  paymentMethod: '',
  address: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: {
            reducer: (state, {payload}: PayloadAction<CartItem>) => {
                const idx = state.items.findIndex(x => x.product._id === payload.product._id && x.size === payload.size)
                if(idx !== -1){
                    const item = state.items[idx]
                    state.items[idx] = {...item, qty: item.qty + 1}
                    state.totalPrice += item.product.price
                } else {
                    state.items.push(payload)
                    state.totalPrice += payload.price
                } 
            },
            prepare: (props: AddCartItemPops) => {
                const id = uuid.v4()
                return {payload: {id, qty: 1, price: props.product.price, ...props}}
            }
        },
        removeCartItem(state, {payload}: PayloadAction<string>){
            const item = state.items.find(x => x.id === payload)
            if(!item) return state
            return {
                ...state, 
                items: state.items.filter(x => x.id !== payload),
                totalPrice: state.totalPrice - item.price
            }
        },
        increaseCartItem(state, {payload}: PayloadAction<string>){
            let productPrice = 0
            const updatedItems = state.items.map(item => {
                if(item.id !== payload) {
                    return item
                }
                productPrice = item.product.price
                return {...item, qty: item.qty + 1, price: productPrice * (item.qty + 1)}
            })
            return {...state, items: updatedItems, totalPrice: state.totalPrice + productPrice}
        },
        decreaseCartItem(state, {payload}: PayloadAction<string>){
            let productPrice = 0
            const updatedItems = state.items.map(item => {
                if(item.id !== payload) {
                    return item
                }
                if(item.qty === 1) return item
                productPrice = item.product.price
                return {...item, qty: item.qty - 1, price: productPrice * (item.qty - 1)}
            })
            return {...state, items: updatedItems, totalPrice: state.totalPrice - productPrice}
        },
        changeCartItemSize(state, {payload}: PayloadAction<{id: string, size: Size}>){
            const currentItem = state.items.find(x => x.id === payload.id)
            if(!currentItem) return state
            const sameSizeItem = state.items.find(x => x.product._id === currentItem.product._id && x.size === payload.size)
            if(sameSizeItem){
                state.items = state.items.filter(x => x.id !== payload.id)
                .map(x => {
                    if(x.id !== sameSizeItem.id) return x
                    return {...x, qty: x.qty + currentItem.qty, price: x.price + currentItem.price}
                })
            } else {
                state.items = state.items.map(x => {
                     if(x.id !== payload.id) return x
                     return {...x, size: payload.size}
                })
            }
        },
        selectPaymentMethod(state, {payload}: PayloadAction<string | null>){
            state.paymentMethod = payload
        },
        selectAddress(state, {payload}: PayloadAction<Address | null>){
            state.address = payload
        },
        clearCart(state){
            state.items = []
        },
        setCartItems(state, {payload}: PayloadAction<CartItem[]>){
            state.items = payload
            const totalPrice = payload.reduce((acc, item) => {
                return acc + item.qty*item.price
            }, 0)
            state.totalPrice = totalPrice
        }
    },
})

export const {
    addCartItem, 
    removeCartItem, 
    increaseCartItem, 
    decreaseCartItem, 
    changeCartItemSize, 
    selectPaymentMethod,
    selectAddress,
    clearCart,
    setCartItems
} = cartSlice.actions

export default cartSlice.reducer;