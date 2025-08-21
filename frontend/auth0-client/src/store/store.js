import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from '../features/authentication/auth-slice'
export const store = configureStore({
      reducer: {
            token: tokenReducer
      }
})