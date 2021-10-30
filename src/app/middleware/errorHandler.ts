import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'

export const rtkQueryErrorHandler: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if(action.meta.arg.endpointName !== 'getMe'){
      }
    }

    return next(action)
  }