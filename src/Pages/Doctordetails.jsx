import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Common/Layout'
import { useQuery } from '@tanstack/react-query' // Import for useQuery
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { doctordetails } from './pagesslice'
import Loader1 from '../Common/Loader1'

const Doctordetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { doctordetaildata } = useSelector((state) => state?.Doctordetails);

    console.log("Doc..........", doctordetaildata);

    // Get Product For Use Query 
    const getDoctordetails = async () => {
        const response = await dispatch(doctordetails(id)) // Call Showproduct function
        return response?.payload
    }

    // Use Query For Department
    const { isLoading, isError, data: doctordetailsdata, error, refetch } = useQuery({
        queryKey: ['doctordetails'],
        queryFn: getDoctordetails // This line of code work as same as useEffect()
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

    console.log("Checkssssss", doctordetailsdata);

    return (
        <>
            <Layout>

                {/* <!-- About Start --> */}
                <div class="container-fluid py-5 mt-5">
                    <div class="container">
                        <div class="row gx-5">
                            <div class="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
                                <div class="position-relative h-100 mt-5 mb-5">
                                    <img class="position-absolute w-100  rounded" src={`${process.env.REACT_APP_BASE_URL}${doctordetailsdata?.image}`} style={{ objectFit: 'cover', justifyContent: 'center', alignItems: 'center', height:'500px' }} />
                                </div>
                            </div>
                            <div class="col-lg-7">
                                <div class="mb-4">
                                    <h1 class="display-4">Introducing to {doctordetaildata?.name}</h1>
                                    <b><p>Department - {doctordetaildata?.department_id?.departmentName}</p></b>
                                </div>
                                <p>{doctordetailsdata?.description}</p>

                                <Link to={`/appointment/${id}`}>
                                    <button type='button' className='btn-danger mb-5 mt-3' style={{ borderRadius: '30px', height: '50px' }}>Make Appointment</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- About End --> */}
            </Layout>
        </>
    )
}

export default Doctordetails
