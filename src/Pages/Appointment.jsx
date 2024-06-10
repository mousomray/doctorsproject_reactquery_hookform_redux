import React, { useId, useState } from 'react'
import Layout from '../Common/Layout'
import { appointment } from './pagesslice'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { doctordetails } from './pagesslice';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Loader2 from '../Common/Loader2';

const Appointment = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const name = localStorage.getItem("name")
    const userID = localStorage.getItem("id")
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { doctordetaildata } = useSelector((state) => state?.Doctordetails);

    console.log("Doc..........", doctordetaildata);

    const reg = async (data) => {

        const mydata = {
            department_id: doctordetaildata?.department_id?._id,
            doctor_id: doctordetaildata?._id,
            user_id: userID,
            phone: data.phone,
            message: data.message
        }

        const response = await dispatch(appointment(mydata))
        console.log("My Appointment response is ", response);
        if (response && response?.payload?.status === true) {
            navigate('/dashboard')
            setLoading(false)
        } else {
            setLoading(false)
        }
        return response.data;
    };

    // Get Product For Use Query 
    const getDoctordetails = async () => {
        const response = await dispatch(doctordetails(id)) // Call Showproduct function
        return response?.payload
    }

    // Start Mutation Area
    const mutation = useMutation({
        mutationFn: (data) => reg(data),
    });

    // Handle On Submit Area
    const onSubmit = (data) => {
        mutation.mutate(data);
        setLoading(true)
    };

    // Use Query For Department
    const { isLoading, isError, data: doctordetailsdata, error, refetch } = useQuery({
        queryKey: ['doctordetails'],
        queryFn: getDoctordetails // This line of code work as same as useEffect()
    })

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    console.log("Checkssssss", doctordetailsdata);

    return (
        <>
            <Layout>

                {/* <!-- Appointment Start --> */}
                <div class="container-fluid" style={{ marginTop: '100px', backgroundImage: 'url(https://www.shutterstock.com/image-photo/laptop-keyboard-stethoscope-on-blue-260nw-1907543080.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <div class="container py-5">
                        <div class="row gx-5">
                            <div class="col-lg-6 mb-5 mb-lg-0">
                                <div class="mb-4">
                                    <h5 class="d-inline-block text-uppercase border-bottom border-5" style={{ color: 'red' }}>Appointment</h5>
                                    <h1 class="display-4">Make An Appointment For Your Family</h1>
                                </div>
                                <h4 class="mb-5" style={{ color: 'blue' }}>We're pleased to assist you with scheduling your appointment with {doctordetaildata?.name} at our medical practice. Please find the available slots below and select the one that best fits your schedule. If you have any questions or require assistance, feel free to contact our office.</h4>
                                <Link class="btn btn-outline-dark rounded-pill py-3 px-5" to="/department">Back</Link>
                            </div>
                            <div class="col-lg-6">
                                <div class="bg-black text-center rounded p-5">
                                    <h1 class="mb-4">Book An Appointment</h1>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div class="row g-3">
                                            <div class="col-12 col-sm-6">
                                                <select class="form-select bg-light border-0" style={{ height: '55px' }} {...register("department_id")} >
                                                    <option name="department_id" selected >{doctordetaildata?.department_id?.departmentName}</option>
                                                </select>
                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <select class="form-select bg-light border-0" style={{ height: '55px' }} {...register("doctor_id")} >
                                                    <option selected name="doctor_id" >{doctordetaildata?.name}</option>
                                                </select>
                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <input type="text" class="form-control bg-light border-0" placeholder="Your Name" name="user_id" value={name} style={{ height: '55px' }}
                                                    {...register("user_id")}
                                                />
                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <input type="number" class="form-control bg-light border-0" placeholder="Your phone" name="phone" style={{ height: '55px' }}

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

                                            <div class="col-12 col-sm-6">
                                                <div class="date" id="date" data-target-input="nearest">
                                                    <input type="text"
                                                        class="form-control bg-light border-0 datetimepicker-input"
                                                        placeholder="Date" data-target="#date" data-toggle="datetimepicker"
                                                        value={doctordetaildata?.date ? new Date(doctordetaildata.date).toLocaleDateString('en-GB') : ''}
                                                        style={{ height: '55px' }} />
                                                </div>
                                            </div>

                                            <div class="col-12 col-sm-6">
                                                <div class="time" id="time" data-target-input="nearest">
                                                    <input type="text"
                                                        class="form-control bg-light border-0 datetimepicker-input"
                                                        placeholder="Time" data-target="#time" data-toggle="datetimepicker" value={`${doctordetaildata?.aperture_time} - ${doctordetaildata?.departure_time}`} style={{ height: '55px' }} />
                                                </div>
                                            </div>

                                            <div class="col-12 col-sm-12">
                                                <input type="text" class="form-control bg-light border-0" name="message" placeholder="Message" style={{ height: '55px' }}

                                                    {...register("message", {
                                                        required: "This field is Required",
                                                        minLength: {
                                                            value: 10,
                                                            message: "Message must be atleast 10 characters"
                                                        }
                                                    })}

                                                />
                                                {errors?.message && (
                                                    <p style={{ color: 'red' }}>{errors.message.message}</p>
                                                )}
                                            </div>

                                            <div class="col-12">
                                                <button class="btn btn-primary w-100 py-3" type="submit">{loading ? <Loader2 /> : 'Make Appointment'}</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Appointment End --> */}

            </Layout>

        </>
    )
}

export default Appointment
