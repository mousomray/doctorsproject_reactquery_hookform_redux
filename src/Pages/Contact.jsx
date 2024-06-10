import React, { useState } from 'react'
import Layout from '../Common/Layout'
import { Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useMutation } from "@tanstack/react-query";
import { contact } from './pagesslice';
import { useNavigate } from 'react-router-dom';
import Loader2 from '../Common/Loader2';

const Contact = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const con = async (data) => {

        const mycontactdata = {
            name: data.name,
            email: data.email,
            topic: data.topic,
            phone: data.phone,
            msg: data.msg,
        }

        const response = await dispatch(contact(mycontactdata))
        console.log("My Contact response is ", response);
        if (response && response?.type === "contact/fulfilled") {
            reset(); // Blank form after submitting data
            setLoading(false)
        }
        return response.data;
    };

    // Start Mutation Area
    const mutation = useMutation({
        mutationFn: (data) => con(data),
    });


    // Handle On Submit Area
    const onSubmit = (data) => {
        mutation.mutate(data);
        setLoading(true)
    };

    return (
        <>
            <Layout>

                {/*Hero Section Start*/}
                <div
                    style={{
                        position: "relative",
                        marginBottom: "15px",
                        marginTop: "69px",
                        width: "100%",
                        height: "400px",
                    }}
                >
                    <video
                        src="/video/contact.mp4"
                        autoPlay
                        loop
                        muted
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            fontSize: "3rem",
                            fontWeight: "bold",
                            zIndex: 1,
                        }}
                    >
                        Contact Us
                    </Typography>
                </div>
                {/*Hero Section End*/}

                {/* <!-- Contact Start --> */}
                <div class="container-fluid pt-5">
                    <div class="container">
                        <div class="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
                            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Any Questions?</h5>
                            <h1 class="display-4">Please Feel Free To Contact Us</h1>
                        </div>
                        <div class="row g-5 mb-5">
                            <div class="col-lg-4">
                                <div class="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '200px' }}>
                                    <div class="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4" style={{ width: '100px', height: '70px', transform: 'rotate(-15deg)' }}>
                                        <i class="fa fa-2x fa-location-arrow text-white" style={{ transform: 'rotate(15deg)' }}></i>
                                    </div>
                                    <h6 class="mb-0">7003 Street, Kolkata, India</h6>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '200px' }}>
                                    <div class="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4" style={{ width: '100px', height: '70px', transform: 'rotate(-15deg)' }}>
                                        <i class="fa fa-2x fa-phone text-white" style={{ transform: 'rotate(15deg)' }}></i>
                                    </div>
                                    <h6 class="mb-0">+033-26643827</h6>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="bg-light rounded d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '200px' }}>
                                    <div class="d-flex align-items-center justify-content-center bg-primary rounded-circle mb-4" style={{ width: '100px', height: '70px', transform: 'rotate(-15deg)' }}>
                                        <i class="fa fa-2x fa-envelope-open text-white" style={{ transform: 'rotate(15deg)' }}></i>
                                    </div>
                                    <h6 class="mb-0">mousom@gmail.com</h6>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12" style={{ height: '500px' }}>
                                <div class="position-relative h-100">
                                    <iframe class="position-relative w-100 h-100"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58906.14545488164!2d88.28142013124996!3d22.667427400000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89ce68e7cfa39%3A0xecc5dd803484eae5!2sUttarpara%20Co-operative%20Bank!5e0!3m2!1sen!2sin!4v1712406400333!5m2!1sen!2sin"
                                        frameborder="0" style={{ border: '0' }} allowfullscreen="" aria-hidden="false"
                                        tabindex="0"></iframe>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center position-relative" style={{ marginTop: '-200px', zIndex: '1' }}>
                            <div class="col-lg-8">
                                <div class="bg-white rounded p-5 m-5 mb-0">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div class="row g-3">

                                            <div class="col-12 col-sm-6">
                                                <input type="text" class="form-control bg-light border-0" placeholder="Your Name" name="name" style={{ height: '55px' }}

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
                                            </div>

                                            <div class="col-12 col-sm-6">
                                                <input type="email" class="form-control bg-light border-0" placeholder="Your Email" name="email" style={{ height: '55px' }}

                                                    {...register("email", {
                                                        required: "This field is required",
                                                        pattern: {
                                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                            message: "Email Pattern should be xyz@gmail.com",
                                                        },
                                                    })}

                                                />
                                                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                            </div>

                                            <div class="col-12">
                                                <input type="text" class="form-control bg-light border-0" placeholder="Topic" name="topic" style={{ height: '55px' }}


                                                    {...register("topic", {
                                                        required: "This field is Required",
                                                        minLength: {
                                                            value: 3,
                                                            message: "Topic must be atleast 3 characters"
                                                        }
                                                    })}

                                                />
                                                {errors?.topic && (
                                                    <p style={{ color: 'red' }}>{errors.topic.message}</p>
                                                )}
                                            </div>

                                            <div class="col-12">
                                                <input type="number" class="form-control bg-light border-0" placeholder="Phone" name="phone" style={{ height: '55px' }}

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

                                            </div>

                                            <div class="col-12">
                                                <textarea class="form-control bg-light border-0" rows="5" name="msg" placeholder="Message"

                                                    {...register("msg", {
                                                        required: "This field is Required",
                                                        minLength: {
                                                            value: 3,
                                                            message: "Topic must be atleast 3 characters"
                                                        }
                                                    })}

                                                ></textarea>
                                                {errors?.msg && (
                                                    <p style={{ color: 'red' }}>{errors.msg.message}</p>
                                                )}
                                            </div>
                                            <div class="col-12">
                                                <button class="btn btn-primary w-100 py-3" type="submit">

                                                    {loading ? <Loader2 /> : 'Send'}

                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Contact End --> */}


            </Layout>
        </>
    )
}

export default Contact
