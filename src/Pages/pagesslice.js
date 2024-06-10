import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axiosInstance from "../api/api"
import { toast } from "react-toastify";

// Call Api for Get All Department
export const alldepartment = createAsyncThunk("alldepartment", async (_, { rejectWithValue }) => {
    try {
        const apiurl = "alldepartment"
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching All Department Data", response);
        return response?.data?.data;
    } catch (error) {
        console.log("Error Fetching All Department data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Get All Doctors
export const alldoctors = createAsyncThunk("alldoctors", async (_, { rejectWithValue }) => {
    try {
        const apiurl = "featured"
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching All Doctor Data", response);
        return response?.data?.data;
    } catch (error) {
        console.log("Error Fetching All Doctor data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Get Personal Care Doctors
export const personalcare = createAsyncThunk("personalcare", async (_, { rejectWithValue }) => {
    try {
        const apiurl = "personalcare"
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching All Personal Care Doctor", response);
        return response?.data?.data[0].doctor_id;
    } catch (error) {
        console.log("Error Fetching All Personal Care Doctor data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Get Child Care Doctors
export const childcare = createAsyncThunk("childcare", async (_, { rejectWithValue }) => {
    try {
        const apiurl = "childcare"
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching All Child Care Doctor", response);
        return response?.data?.data[0].doctor_id;
    } catch (error) {
        console.log("Error Fetching All Child Care Doctor data", error);
        return rejectWithValue(error.response.data);
    }
});

// Fetch Department wise doctor
export const depdoctor = createAsyncThunk("depdoctor", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `departmentidwisedoctor/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Department Wise Doctor", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Department wise doctor", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const depdoctorslice = createSlice({
    name: "depdoctorslice",
    initialState: {
        depdoctordata: [],
        loading: false,
        error: null,

    },

    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(depdoctor.pending, (state) => {
                state.loading = true;
            })
            .addCase(depdoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.depdoctordata = action.payload;
            })
            .addCase(depdoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default depdoctorslice.reducer;


// Fetch Department wise doctor
export const doctordetails = createAsyncThunk("doctordetails", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `doctordetails/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Doctor Details", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Doctor Details", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
export const doctordetailslice = createSlice({
    name: "doctordetailslice",
    initialState: {
        doctordetaildata: [],
        loading: false,
        error: null,

    },

    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(doctordetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(doctordetails.fulfilled, (state, action) => {
                state.loading = false;
                state.doctordetaildata = action.payload;
            })
            .addCase(doctordetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

// Fetch Appointment API 
export const appointment = createAsyncThunk("appointment", async (data, { rejectWithValue }) => {
    try {
        const apiurl = 'createappointment'
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Appointment Data", response);
        toast.success(response?.data?.message)
        return response?.data
    } catch (error) {
        console.log("Error Fetching Appointment Data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// Fetch Doctors List 
export const doctorlist = createAsyncThunk("doctorlist", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'alldoctordepartment'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Doctor List Data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Doctor List Data", error);
        return rejectWithValue(error.response.data);
    }
});

// Fetch All Blogs 
export const blog = createAsyncThunk("blog", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'allblog'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Blog Data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Blog Data", error);
        return rejectWithValue(error.response.data);
    }
});
// createSlice area start
export const blogslice = createSlice({
    name: "blogslice",
    initialState: {
        blogslicedata: [],
        loading: false,
        error: null,

    },

    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(blog.pending, (state) => {
                state.loading = true;
            })
            .addCase(blog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogslicedata = action.payload;
            })
            .addCase(blog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

// Fetch Search 
export const search = createAsyncThunk("search", async (query, { rejectWithValue }) => {
    try {
        const apiurl = `blogsearch/${query}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Search Data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Search Data", error);
        return rejectWithValue(error.response.data);
    }
});

// Recent Blog
export const recent = createAsyncThunk("recent", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'recentblog'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Recent Data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Recent Data", error);
        return rejectWithValue(error.response.data);
    }
});


// Blog Details
export const blogdetails = createAsyncThunk("blogdetails", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `singleblog/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Blogdetails Data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Blog Details Data", error);
        return rejectWithValue(error.response.data);
    }
});
// createSlice area start
export const blogdetailsslice = createSlice({
    name: "blogdetailsslice",
    initialState: {
        blogdetailslicedata: [],
        loading: false,
        error: null,

    },

    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(blogdetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(blogdetails.fulfilled, (state, action) => {
                state.loading = false;
                state.blogdetailslicedata = action.payload;
            })
            .addCase(blogdetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


// Show Comment
export const showcomment = createAsyncThunk("showcomment", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `getblogcomment/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Show Comment Data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Show Comment Data", error);
        return rejectWithValue(error.response.data);
    }
});

// Create Comment
export const createcomment = createAsyncThunk("createcomment", async (data, { rejectWithValue }) => {
    try {
        const apiurl = 'createblogcomment'
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Add Comment Data", response);
        toast.success(response?.data?.message)
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Add Comment Data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// Post Contact
export const contact = createAsyncThunk("contact", async (data, { rejectWithValue }) => {
    try {
        const apiurl = 'createcontact'
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Add Contact Data", response);
        toast.success(response?.data?.message)
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Add Contact Data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});


// Dashboard
export const dashboard = createAsyncThunk("dashboard", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `userdash/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Dashboard Data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Dashboard Data", error);
        return rejectWithValue(error.response.data);
    }
});













