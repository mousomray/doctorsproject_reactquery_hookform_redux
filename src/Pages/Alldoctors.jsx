import React from 'react'
import Layout from '../Common/Layout'
import { Link } from 'react-router-dom'
import { doctorlist } from './pagesslice'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { Typography } from '@mui/material'

const Alldoctors = () => {

    const dispatch = useDispatch()

    // Get Product For Use Query 
    const getDoctorlistdata = async () => {
        const response = await dispatch(doctorlist()) // Call Showproduct function
        return response?.payload
    }

    // Use Query For Department
    const { isLoading, isError, data: doctorlistdata, error, refetch } = useQuery({
        queryKey: ['doctorlist'],
        queryFn: getDoctorlistdata // This line of code work as same as useEffect()
    })

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

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
                        src="/video/meet.mp4"
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
                            color: "primary",
                            fontSize: "3rem",
                            fontWeight: "bold",
                            zIndex: 1,
                        }}
                    >
                        Meet Our Doctors
                    </Typography>
                </div>
                {/*Hero Section End*/}

                {/* <!-- Services Start --> */}
                <div class="container-fluid py-5">
                    <div class="container">
                        <div class="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
                            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">All Doctors</h5>
                            <h1 class="display-4">Specialized Doctors</h1>
                        </div>
                        <div class="row g-5">

                            {Array.isArray(doctorlistdata) && doctorlistdata?.map((value) => {
                                return (
                                    <>
                                        <div class="col-lg-4 col-md-6">
                                            <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                                <div>
                                                    <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" style={{ height: '250px', width: '100%', objectFit: 'cover', marginTop: '10px' }} />
                                                </div>
                                                <h4 class="mb-3">{value?.name}</h4>

                                                {value?.department_details?.map((item) => {
                                                    return (
                                                        <>
                                                            <b><p>{item?.departmentName}</p></b>
                                                        </>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                        </div>
                    </div>
                </div>
                {/* <!-- Services End --> */}

            </Layout>
        </>
    )
}

export default Alldoctors
