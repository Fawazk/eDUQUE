import { configureStore } from "@reduxjs/toolkit"
import coursereduxReducer from "./Coursesredux/Courseredux_Slice"

export default configureStore({
    reducer:{
        courseredux:coursereduxReducer,
    }
})