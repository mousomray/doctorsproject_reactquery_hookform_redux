import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { alldepartment } from '../Pages/pagesslice'
import { useQuery } from '@tanstack/react-query' // Import for useQuery
import { useDispatch } from 'react-redux'
import Layout from '../Common/Layout'
import Loader1 from '../Common/Loader1'

const Department = () => {

    const dispatch = useDispatch()

    // Get Product For Use Query 
    const getDepartmentdata = async () => {
        const response = await dispatch(alldepartment()) // Call Showproduct function
        return response?.payload
    }

    // Use Query For Department
    const { isLoading, isError, data: departmentdata, error, refetch } = useQuery({
        queryKey: ['department'],
        queryFn: getDepartmentdata // This line of code work as same as useEffect()
    })

    // Loading state handling
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <h1><Loader1 /></h1>
            </div>
        )
    }

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
                        src="/video/department.mp4"
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
                            color: "black",
                            fontSize: "3rem",
                            fontWeight: "bold",
                            zIndex: 1,
                        }}
                    >
                        All Department
                    </Typography>
                </div>
                {/*Hero Section End*/}

                {/* <!-- Services Start --> */}
                <div class="container-fluid py-5">
                    <div class="container">
                        <div class="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
                            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">All Department</h5>
                            <h1 class="display-4">Award winning patient care</h1>
                        </div>
                        <div class="row g-5">

                            {Array.isArray(departmentdata) && departmentdata?.map((value) => {
                                return (
                                    <>
                                        <div class="col-lg-4 col-md-6">
                                            <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '550px' }}>
                                                <div>
                                                    <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" style={{ height: '300px', width: '100%', objectFit: 'cover', marginTop: '130px' }} />
                                                </div>
                                                <h4 class="mb-3">{value?.departmentName}</h4>
                                                <p class="m-0">{value?.description.slice(0, 100)}</p>
                                                <Link to={`/depwisedoctor/${value._id}`}>
                                                    <button type='button' className='btn-danger mt-3' style={{ borderRadius: '30px', height: '50px', marginBottom: '180px' }}>Make Appointment</button>
                                                </Link>
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

export default Department
