import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../Common/Layout'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from "@tanstack/react-query";
import { registerUser } from './authslice';
import { useNavigate } from 'react-router-dom';
import Loader2 from '../Common/Loader2';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();



const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state?.Auth);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [image, setImage] = useState(null);

    const reg = async (data) => {

        // Handling Form Data Area
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("password", data.password);
        formData.append("forget", data.forget);
        formData.append("image", image);

        const response = await dispatch(registerUser(formData))
        console.log("My Reg response is ", response);
        if (response && response?.payload?.success === true) {
            reset(); // Blank form after submitting data
            navigate("/login");
        } else {
            navigate("/register")
        }
        return response.data;
    };

    // Start Mutation Area
    const mutation = useMutation({
        mutationFn: (data) => reg(data),
    });

    // Handle On Submit Area
    const onSubmit = (data) => {
        mutation.mutate(data);
    };


    return (
        <>
            <Layout>

                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '120px'
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>

                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            {...register("name", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Name must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.name && (
                                            <p style={{ color: 'red' }}>{errors.name.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="email"
                                            id="email"
                                            label="Email"
                                            {...register("email", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Email Pattern should be xyz@gmail.com",
                                                },
                                            })}
                                        />
                                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="phone"
                                            label="Phone"
                                            {...register("phone", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 10,
                                                    message: "Phone number must be 10 characters"
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message: "Phone number must be 10 characters"
                                                }
                                            })}
                                        />
                                        {errors?.phone && (
                                            <p style={{ color: 'red' }}>{errors.phone.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="password"
                                            id="password"
                                            label="Password"
                                            {...register("password", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be 8 characters"
                                                }
                                            })}
                                        />
                                        {errors?.password && (
                                            <p style={{ color: 'red' }}>{errors.password.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="password"
                                            id="forget"
                                            label="Re Enter Password"
                                            {...register("forget", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Forget must be 8 characters"
                                                }
                                            })}
                                        />
                                        {errors?.forget && (
                                            <p style={{ color: 'red' }}>{errors.forget.message}</p>
                                        )}
                                    </Grid>

                                    {/*This form section is for the submit image*/}
                                    <Grid item xs={12}>
                                        <div style={{ marginBottom: '20px' }}>
                                            <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                                            {image !== "" && image !== undefined && image !== null ? (
                                                <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                                            ) : (
                                                <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                                            )}
                                        </div>
                                    </Grid>
                                    {/*Image area end*/}
                                </Grid>


                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? <Loader2 /> : 'Register'}
                                </Button>

                                <Grid container>
                                    <Grid item>
                                        <Link to="/login" variant="body2">
                                            {"You have an account? Login"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>

            </Layout>
        </>
    )
}

export default Register
