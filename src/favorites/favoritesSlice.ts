import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as uuid from 'uuid'
import { IProduct, IProductPopulated } from '~/types/products';

export interface FavItem{
    product: IProduct | IProductPopulated
    id: string
}

interface FavoritesState{
    items: FavItem[]
}

const initialState: FavoritesState = {
    items: []
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavItem: {
            reducer: (state, {payload}: PayloadAction<FavItem>) => {
                state.items = [...state.items, payload]
            },
            prepare: (product: IProduct | IProductPopulated) => {
                const id = uuid.v4()
                return {payload: {id, product}}
            }
        },
        removeFavItem(state, {payload}: PayloadAction<string>){
            state.items = state.items.filter(x => x.id !== payload)
        }
    },
})

export const {addFavItem, removeFavItem} = favoritesSlice.actions

export default favoritesSlice.reducer;