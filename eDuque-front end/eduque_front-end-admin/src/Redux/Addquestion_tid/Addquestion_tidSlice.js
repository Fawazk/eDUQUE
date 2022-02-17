import { createSlice } from "@reduxjs/toolkit";

export const Addquestion_tid = createSlice({
    name:"Task_id",
    initialState:{
        value:""
    },
    reducers:{
        change_Addquestion_tid:(state,action) =>{
            state.value = action.payload.task_id
        }
    }
})

export const {change_Addquestion_tid} = Addquestion_tid.actions
export default Addquestion_tid.reducer