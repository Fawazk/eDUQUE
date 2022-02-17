import { createSlice } from "@reduxjs/toolkit";

export const courseredux = createSlice({
    name:"course",
    initialState:{
        value:[]
    },
    reducers:{
        change_courseredux:(state,action) =>{
            state.value = action.payload.course
        }
    }
})

export const {change_courseredux} = courseredux.actions
export default courseredux.reducer