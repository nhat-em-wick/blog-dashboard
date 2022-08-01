import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPages: (state, action) => {
      state.value = action.payload
    },
    addPage: (state, action) => {
      state.value = [action.payload, ...state.value]
    },
    removePage: (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload._id)
    }
  }
})

export const {setPages, removePage, addPage} = pagesSlice.actions
export default pagesSlice.reducer