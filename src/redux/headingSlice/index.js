import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: ''
}

const headingSlice = createSlice({
  name: 'heading',
  initialState,
  reducers: {
    setHeading: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {setHeading} = headingSlice.actions
export default headingSlice.reducer