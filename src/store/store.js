import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Auth/authslice" // In this case we use { } because we not do export default only do export
import depdoctorslice from "../Pages/pagesslice"
import {doctordetailslice} from "../Pages/pagesslice"
import {blogslice} from "../Pages/pagesslice"
import {blogdetailsslice} from "../Pages/pagesslice"

export const store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer, // Reducer for Auth 
        Depdoctor: depdoctorslice, // Slicer For Depdoctor
        Doctordetails: doctordetailslice.reducer, // I use .reducer because I not use default
        Bloglist: blogslice.reducer,
        Blogsingle: blogdetailsslice.reducer,
    },
});