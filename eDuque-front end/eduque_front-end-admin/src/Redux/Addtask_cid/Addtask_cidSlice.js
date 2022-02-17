import { createSlice } from "@reduxjs/toolkit";

export const Addtask_cidSlice = createSlice({
    name:"course_id",
    initialState:{
        value:""
    },
    reducers:{
        change_Addtask_cid:(state,action) =>{
            state.value = action.payload.course_id
        }
    }
})

export const {change_Addtask_cid} = Addtask_cidSlice.actions
export default Addtask_cidSlice.reducer