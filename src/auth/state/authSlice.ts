import { createSlice,  createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { fetchUser, loginAPI, registerAPI, logOutAPI } from './authAPI';
import { RootState } from '../../app/store';
import { LoginUserDto, SignUpUserDto } from './dto/loginUser.dto';
import { AxiosError} from 'axios';
import {IUser} from '~/types/user'

export type Role = 'admin' | 'editor' | 'customer'

export const getUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, {rejectWithValue}) => {
     try {
      const res = await fetchUser()
      return res.data
    } catch (error) {
      const err = error as AxiosError   
      return rejectWithValue(err.response)
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (dto: LoginUserDto, {rejectWithValue, dispatch}) => {
    try {
      await loginAPI(dto)
      return dispatch(getUser())
    } catch (error) {
      const err = error as AxiosError    
      return rejectWithValue(err.response?.data)
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signup',
  async (dto: SignUpUserDto, {rejectWithValue, dispatch}) => {
    try {
      await registerAPI(dto)
      return dispatch(getUser())
    } catch (error) {
      const err = error as AxiosError    
      return rejectWithValue(err.response?.data)
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      await logOutAPI()
    } catch (error) {
      const err = error as AxiosError    
      return rejectWithValue(err.response?.data)
    }
  }
);

interface AuthState{
    isAuth: boolean
    user: IUser | null
    loading: boolean
    error: null | string
}

const initialState: AuthState = {
    isAuth: false,
    user: null,
    loading: true,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.isAuth = false
            state.user = null
        },
        clearAuthError: (state) => {
            state.error = null
        },
    },
    extraReducers: builder => {
        builder
        .addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(login.rejected, (state, action: AnyAction) => {
            const {payload} = action
            state.loading = false
            if(payload?.status === 'FETCH_ERROR'){
                state.error = 'Server does not respond'
                return
            }
            state.error = payload?.data?.message || payload?.message
        })
         .addCase(signUp.rejected, (state, action: AnyAction) => {
            const {payload} = action
            state.loading = false
            if(payload?.status === 'FETCH_ERROR'){
                state.error = 'Server does not respond'
                return
            }
            state.error = payload?.data?.message || payload?.message
        })
        .addCase(signUp.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getUser.pending, (state) => {
            state.loading = true
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isAuth = true
        })
        .addCase(getUser.rejected, (state) => {
            state.loading = false
            state.isAuth = false
            state.user = null
        })
        .addMatcher((action: AnyAction) => {
          return action.type.startsWith('auth/logout')
        }, (state) => {
          state.isAuth = false
          state.user = null
        })
    }
})

export const {clearUser, clearAuthError} = authSlice.actions
export const getMe = (state: RootState) => state.auth.user
export default authSlice.reducer;