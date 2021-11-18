import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {IUser} from '~/types/user'
import { api } from '~/app/api';

export type Role = 'admin' | 'editor' | 'customer'

const isRejectedAction = (action: AnyAction): action is AnyAction => { 
  return action.type.endsWith("/rejected");
};

interface AuthState{
    isAuth: boolean
    user: IUser | null
    loading: boolean
}

const initialState: AuthState = {
    isAuth: false,
    user: null,
    loading: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.isAuth = false
            state.user = null
        }
    },
    extraReducers: builder => {
        builder
        .addMatcher(api.endpoints.signup.matchPending , (state) => {
          state.loading = true
          state.isAuth = false
        })
        .addMatcher(api.endpoints.signup.matchRejected , (state) => {
          state.loading = false
        })
        .addMatcher(api.endpoints.signup.matchFulfilled , (state, {payload}) => {
          state.loading = false
          state.user = payload
          state.isAuth = true
        })
        .addMatcher(api.endpoints.loginLocal.matchPending , (state) => {
          state.loading = true
          state.isAuth = false
        })
        .addMatcher(api.endpoints.loginLocal.matchRejected , (state) => {
          state.loading = false
        })
        .addMatcher(api.endpoints.loginLocal.matchFulfilled , (state, {payload}) => {
          state.loading = false
          state.user = payload
          state.isAuth = true
        })
        .addMatcher(api.endpoints.loginWithSocialMedia.matchPending , (state) => {
          state.loading = true
          state.isAuth = false
        })
        .addMatcher(api.endpoints.loginWithSocialMedia.matchRejected , (state) => {
          state.loading = false
        })
        .addMatcher(api.endpoints.loginWithSocialMedia.matchFulfilled , (state, {payload}) => {
          state.loading = false
          state.user = payload
          state.isAuth = true
        })
        .addMatcher(api.endpoints.logout.matchPending , (state) => {
          state.loading = true
          state.user = null
          state.isAuth = false
        })
        .addMatcher(api.endpoints.logout.matchFulfilled , (state) => {
          state.loading = false
        })
        .addMatcher(api.endpoints.logout.matchRejected , (state) => {
          state.loading = false
        })
        .addMatcher(api.endpoints.getUser.matchPending , (state) => {
          state.loading = true
        })
        .addMatcher(api.endpoints.getUser.matchFulfilled , (state, {payload}) => {
          state.loading = false
          state.user = payload
          state.isAuth = true
        })
        .addMatcher(api.endpoints.getUser.matchRejected , (state) => {
          state.loading = false
        })
        .addMatcher(isRejectedAction, (state, action: AnyAction) => {
            if(action.payload?.status === 401){
              state.user = null
              state.isAuth = false
            }
        })
    }
})

export const {clearUser} = authSlice.actions
export const getMe = (state: RootState) => state.auth.user
export default authSlice.reducer;