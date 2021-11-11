import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '~/cart/cartSlice';
import { Address } from '~/types/user';
import { addCartItem } from '~/cart/cartSlice';

const isPendingAction = (action: AnyAction): action is AnyAction => { 
  return action.type.endsWith("/pending");
};

const isFulfilledAction = (action: AnyAction): action is AnyAction => { 
  return action.type.endsWith("/fulfilled");
};

const isRejectedAction = (action: AnyAction): action is AnyAction => { 
  return action.type.endsWith("/rejected");
};

type ResponseError = {
    message: string | string[]
    status?: number | string
    endpoint: string | undefined
}

interface MainState{
    loading: {
        isLoading: boolean
        endpoint: string
    }
    error: ResponseError | null
    imageModal: {
        open: boolean,
        url: string
    },
    lookModal: {
        open: boolean,
        look: string 
    },
    addressModal: {
        open: boolean
        address: Address | null
    },
    cartItemModal: {
        open: boolean
        item: CartItem | null
    },
    searchText: string
    searchQuery: string
}

const initialState: MainState = {
    loading: {
        isLoading: false,
        endpoint: ''
    },
    error: null,
    imageModal: {
        open: false,
        url: ''
    },
    lookModal: {
        open: false,
        look: ''
    },
    addressModal: {
        open: false,
        address: null
    },
    cartItemModal: {
        open: false,
        item: null
    },
    searchText: '',
    searchQuery: ''
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        openImageModal(state, action: PayloadAction<string>){
            state.imageModal = {open: true, url: action.payload}
        },
        closeImageModal(state){
            state.imageModal = {open: false, url: ''}
        },
        openLookModal(state, action: PayloadAction<string>){
            state.lookModal = {open: true, look: action.payload}
        },
        closeLookModal(state){
            state.lookModal = {open: false, look: ''}
        },
        openAddressModal(state, action: PayloadAction<Address | undefined | null>){
            state.addressModal = {open: true, address: action.payload || null}
        },
        closeAddressModal(state){
            state.addressModal = {open: false, address: null}
        },
        closeCartItemModal(state){
            state.cartItemModal = {open: false, item: null}
        },
        clearError(state){
            state.error = null
        },
        setSearchText(state, action: PayloadAction<string>){
            state.searchText = action.payload
        },
        setSearchQuery(state, action: PayloadAction<string>){
            state.searchQuery = action.payload
        },
    },
    extraReducers: builder => {
        builder
        .addCase(addCartItem, (state, action) => {
            state.cartItemModal = {open: true, item: action.payload}
        })
        .addMatcher(isPendingAction, (state, action: AnyAction) => {
            const {meta} = action
            const endpoint = meta?.arg?.endpointName
            state.loading = {isLoading: true, endpoint};
            state.error = null;
        })
        .addMatcher(isFulfilledAction, state => {
            state.loading = {isLoading: false, endpoint: ''};
            
        })
        .addMatcher(isRejectedAction, (state, action: AnyAction) => {
            console.log('action ', action)
            const {payload, meta} = action
            const endpoint = meta?.arg?.endpointName
            state.loading = {isLoading: false, endpoint};
            if(payload?.status === 'FETCH_ERROR'){
                state.error = {message: 'Server does not respond', endpoint, status: payload.status}
                return
            }
            if(payload?.data){
                if(payload?.status === 500){
                    state.error = {message: 'Internal server error', status: 500, endpoint}
                } else {
                    state.error = {message: payload.data.message, status: payload.status, endpoint}
                }
            } else {
                if(action.error.name !== "ConditionError"){
                    state.error = {message: action.error?.message || 'Server does not respond', endpoint}
                }
            }  
        })
    }
})

export const {
    closeImageModal, 
    openImageModal, 
    openLookModal, 
    closeLookModal,
    openAddressModal,
    closeAddressModal,
    closeCartItemModal,
    clearError,
    setSearchText,
    setSearchQuery
} = mainSlice.actions

export default mainSlice.reducer;