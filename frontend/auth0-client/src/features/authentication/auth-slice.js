import { createSlice } from "@reduxjs/toolkit"

const token = {
      access_token: null
}

const tokenSlice = createSlice({
      name:'token',
      initialState: token,
      reducers: {
            saveToken(state, action) {
                  state.access_token = action.payload 
            },
            removeToken(state) {
                  state.access_token = null
            }
      }

})

export const { saveToken, removeToken } = tokenSlice.actions
export default tokenSlice.reducer