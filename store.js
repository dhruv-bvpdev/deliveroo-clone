import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import restaurantReducer from './features/restaurantSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    restaurant: restaurantReducer
  }
})
