import { configureStore } from "@reduxjs/toolkit"
import Addtask_cidReducer from "./Addtask_cid/Addtask_cidSlice"
import Addquestion_tidReducer from "./Addquestion_tid/Addquestion_tidSlice"

export default configureStore({
    reducer:{
        Addtask_cid:Addtask_cidReducer,
        Addquestion_tid:Addquestion_tidReducer,
    }
})