import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCate: (state, action) => {
      state.value = action.payload
    },
    addCate: (state, action) => {
      state.value = [action.payload, ...state.value]
    },
    removeCate: (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload._id)
    }
  }
})

export const {setCate, removeCate, addCate} = categoriesSlice.actions
export default categoriesSlice.reducer