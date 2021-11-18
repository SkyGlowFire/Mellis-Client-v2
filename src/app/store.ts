import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import mainReducer from '~/common/state/mainSlice';
import cartReducer from '~/cart/cartSlice';
import favReducer from '~/favorites/favoritesSlice';
import authReducer from '~/auth/state/authSlice'
import alertsReducer from '~/alerts/alertSlice'
import {createBrowserHistory } from 'history'
import {api} from './api'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  main: mainReducer,
  cart: cartReducer,
  favorites: favReducer,
  auth: authReducer,
  alerts: alertsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch)