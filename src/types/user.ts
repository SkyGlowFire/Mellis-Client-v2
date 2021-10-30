export type Role = 'admin' | 'editor' | 'customer'

export interface IUser{
    _id: string
    email: string
    username: string
    role: Role
    firstName: string
    lastName: string
    age: number
    phone: string
    thumbnail: string
    addresses: Address[]
}

export interface Address{
    _id: string
    firstName: string
    lastName: string
    phone: string
    city: string
    streetName: string
    streetNumber: string
    apartment: string
    zip: number
}