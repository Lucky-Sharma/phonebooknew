import { configureStore ,applyMiddleware} from '@reduxjs/toolkit'
import counterReducer from  './Slices/CreateSlice'
// @ts-ignore
import { createLogger } from 'redux-logger'
const logger = createLogger();
export const store = configureStore({
  reducer: {
    ContactReducer: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch