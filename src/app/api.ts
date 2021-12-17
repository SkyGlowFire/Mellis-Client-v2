import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { ICategory } from "../types/categories";
import { IProduct, IProductPopulated } from "~/types/products";
import { Address, IUser } from '~/types/user';
import { IPopulatedLook } from '~/types/looks';
import { AddAddressDto } from './dto/addAddress.sto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { IOrder } from '~/types/orders';
import { CreateOrderDto } from './dto/createOrder.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import {SignUpUserDto} from './dto/signupUser.dto'

const API_URI = process.env.REACT_APP_API_URI

interface GetProductsParams{
  category: string
  group: string
  subGroup: string
  filters: string
}

export interface IProductsResponse{
    products: IProduct[]
    count: number
    minPrice?: number
    maxPrice?: number
    category: ICategory
}

export interface ISearchResponse{
    products: IProduct[]
    total: number
    minPrice?: number
    maxPrice?: number
}

export interface ErrorResponse{
  status: number
  message: string
}

export type SocialMedia = 'google' | 'facebook' | 'vkontakte' | 'twitter'

const baseQuery = fetchBaseQuery({ baseUrl: API_URI, credentials: 'include' })

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  if(result.error && result.error.status === 401){
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    if(refreshResult.data){
      result = await baseQuery(args, api, extraOptions)
    } else {
      return Promise.reject(result.error)
    }  
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories', 'Products', 'Looks', 'Orders', 'User', 'Addresses'],
  endpoints: (builder) => ({
    //auth
    forgotPassword: builder.mutation<void, {email: string}>({
      query: (data) => ({
        url: '/auth/resetPasword',
        method: 'POST',
        body: data
      })
    }),

    resetPassword: builder.mutation<void, {password: string, token: string}>({
      query: ({password, token}) => ({
        url: `/auth/resetPasword/${token}`,
        method: 'PUT',
        body: {password}
      })
    }),

    loginWithSocialMedia: builder.mutation<IUser, {token: string, media: SocialMedia}>({
      query: ({media, ...data}) => ({
        url: `/auth/login-${media}`,
        method: 'POST',
        body: data
      })
    }),

    loginLocal: builder.mutation<IUser, LoginUserDto>({
      query: (data) => ({
        url: '/auth/login-local',
        method: 'POST',
        body: data
      }),
    }),

    signup: builder.mutation<IUser, SignUpUserDto>({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data
      })
    }),

    getUser: builder.query<IUser, void>({
      query: () => `/auth/me`
    }),

    logout: builder.mutation<{success: true}, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      })
    }),

    //profile
    updateUser: builder.mutation<IUser, {id: string, data: UpdateUserDto}>({
       query: ({id, data}) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    
    //addresses
     addAddress: builder.mutation<Address, AddAddressDto>({
       query: (data) => ({
        url: `/users/address`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Addresses']
    }),

    updateAddress: builder.mutation<Address, {id: string, data: AddAddressDto}>({
       query: ({id, data}) => ({
        url: `/users/address/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Addresses']
    }),

    deleteAddress: builder.mutation<Address, string>({
       query: (id) => ({
        url: `/users/address/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Addresses']
    }),

    getAddresses: builder.query<Address[], void>({
      query: () => `/users/address`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Addresses' as const, id: _id })), 'Addresses']
          : ['Addresses'],
    }),

    //categories
    getCategories: builder.query<ICategory[], void>({
      query: () => `/categories`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Categories' as const, id: _id })), 'Categories']
          : ['Categories'],
    }),

    //products
    getProducts: builder.query<IProductsResponse, GetProductsParams>({
      query: ({category, group, subGroup, filters}) => {
        let url = `/products/category/${category}`
        if(group) url += `/${group}`
        if(subGroup) url += `/${subGroup}`
        if(filters !== '') url += `${filters}`
        return url
      },
      providesTags: ['Products'],
    }),

    searchProducts: builder.query<ISearchResponse, {filters: string}>({
      query: ({filters}) => `/products/search${filters}`,
      providesTags: ['Products'],
    }),

    getProduct: builder.query<IProductPopulated, string>({
      query: (id) => `/products/details/${id}`,
      providesTags: (res, err, id) => [{type: 'Products', id}],
    }),

    getRelatedProducts: builder.query<IProduct[], string>({
      query: (id) => `/products/${id}/related-products`,
      providesTags: (res, err, id) => [{type: 'Products', id}],
    }),

    //looks
    getLook: builder.query<IPopulatedLook, string>({
      query: (id) => `/looks/${id}`,
      providesTags: (res, err, id) => [{type: 'Looks', id}],
    }),

    //orders
    getOrders: builder.query<IOrder[], void>({
      query: () => `/orders/my`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Orders' as const, id: _id })), 'Orders']
          : ['Orders'],
    }),
    
    createOrder: builder.mutation<IOrder, CreateOrderDto>({
       query: (data) => ({
        url: `/orders`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Orders']
    }),

  }),
})

export const {
    useGetCategoriesQuery, 
    useGetProductQuery, 
    useGetProductsQuery, 
    useGetLookQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useUpdateUserMutation,
    useGetOrdersQuery,
    useCreateOrderMutation,
    useGetAddressesQuery,
    useSearchProductsQuery,
    useLazySearchProductsQuery,
    useLazyGetProductsQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useLoginWithSocialMediaMutation,
    useLoginLocalMutation,
    useSignupMutation,
    useGetUserQuery,
    useLogoutMutation,
    useLazyGetUserQuery,
    useGetRelatedProductsQuery
} = api