import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import loanReducer from '../features/loan/loanSlice'

export const store = configureStore({
  reducer: {
    loan: loanReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type LoanThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
