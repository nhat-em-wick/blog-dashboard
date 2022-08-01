import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload
    },
    addPost: (state, action) => {
      state.value = [action.payload, ...state.value]
    },
    removePost: (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload._id)
    }
  }
})

export const {setPosts, removePost, addPost} = postsSlice.actions
export default postsSlice.reducer