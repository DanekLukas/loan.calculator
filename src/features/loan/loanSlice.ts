import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface LoanState {
  calc: number
  status: string
}

interface Pass {
  amount: number
  rate: number
  termMonths: number
}

const initialState: LoanState = {
  calc: 0,
  status: 'idle',
}

export const loanAsync = createAsyncThunk('loan/total', async (state: Pass) => {
  const calculate = async () => {
    const { data } = (
      await axios.post('http://localhost:8190/calc', {
        amount: state.amount,
        rate: state.rate,
        termMonths: state.termMonths,
      })
    ).data as { data?: number; error?: string }
    return data || 0
  }
  return await calculate()
  // The value we return becomes the `fulfilled` action payload
})

export const loanSlice = createSlice({
  name: 'loan',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCalc: (state, action: PayloadAction<number>) => {
      state.calc = action.payload
    },

    total: (state, action: PayloadAction<LoanState>) => {},
  },
  extraReducers: builder => {
    builder
      .addCase(loanAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(loanAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.calc = action.payload
      })
      .addCase(loanAsync.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const selectCalc = (state: { loan: LoanState }) => {
  return { calcRedux: state.loan.calc }
}

export default loanSlice.reducer
