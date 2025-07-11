import { configureStore } from '@reduxjs/toolkit'
import counterReducer from  './Slices/CreateSlice'

export const store = configureStore({
  reducer: {
    ContectReducer: counterReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch