import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { depdoctor } from '../Pages/pagesslice'
import { useQuery } from '@tanstack/react-query' // Import for useQuery
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../Common/Layout'
import Loader1 from '../Common/Loader1'

const Depwisedoctor = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { depdoctordata, loading } = useSelector((state) => state?.Depdoctor);

    console.log("Myyyyyyyyyyyy",depdoctordata);

    // Get Product For Use Query 
    const getDepartmentwisedoctordata = async () => {
        const response = await dispatch(depdoctor(id)) // Call Showproduct function
        return response?.payload
    }

    // Use Query For Department
    const { isLoading, isError, data: departmentdata, error, refetch } = useQuery({
        queryKey: ['departmentwisedoctor'],
        queryFn: getDepartmentwisedoctordata // This line of code work as same as useEffect()
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
                        src="/video/depdoctor.mp4"
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
                        {depdoctordata[0]?.department_id?.departmentName} Department
                    </Typography>
                </div>
                {/*Hero Section End*/}

                {/* <!-- Services Start --> */}
                <div class="container-fluid py-5">
                    <div class="container">
                        <div class="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
                            <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Doctors</h5>
                            <h1 class="display-4">Best Doctors</h1>
                        </div>
                        <div class="row g-5">

                            {Array.isArray(departmentdata) && departmentdata?.map((value) => {
                                return (
                                    <>
                                        <div class="col-lg-4 col-md-6">
                                            <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center" style={{height:'550px'}}>
                                                <div>
                                                    <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" style={{ height: '300px', width: '100%', objectFit: 'cover', marginTop: '50px' }} />
                                                </div>
                                                <h4 class="mb-3">{value?.name}</h4>
                                                <p class="m-0">{value?.description.slice(0, 100)}</p>
                                                <Link to={`/doctordetails/${value._id}`}>
                                                    <button type='button' className='btn-danger mb-5 mt-3' style={{borderRadius:'30px', height:'50px', marginBottom:'100px'}}>Make Appointment</button>
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

export default Depwisedoctor
