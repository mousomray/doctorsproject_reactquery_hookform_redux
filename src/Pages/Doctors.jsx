import React from 'react'
import { alldoctors } from '../Pages/pagesslice'
import { useQuery } from '@tanstack/react-query' // Import for useQuery
import { useDispatch } from 'react-redux'

const Doctors = () => {

    const dispatch = useDispatch()

    // Get Product For Use Query 
    const getDoctordata = async () => {
        const response = await dispatch(alldoctors()) // Call Showproduct function
        return response?.payload
    }

    // Use Query For Department
    const { isLoading, isError, data: doctordata, error, refetch } = useQuery({
        queryKey: ['doctor'],
        queryFn: getDoctordata // This line of code work as same as useEffect()
    })

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    console.log("Dovcccc", doctordata);

    return (
        <>
            {/* <!-- Services Start --> */}
            <div class="container-fluid py-5">
                <div class="container">
                    <div class="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
                        <h5 class="d-inline-block text-primary text-uppercase border-bottom border-5">Doctors</h5>
                        <h1 class="display-4">Meet Our Specialist</h1>
                    </div>
                    <div class="row g-5">

                        {Array.isArray(doctordata) && doctordata?.map((value) => {
                            return (
                                <>
                                    <div class="col-lg-4 col-md-6">
                                        <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                            <div>
                                                <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <h4 class="mb-3">{value?.name}</h4>
                                            <p class="m-0">{value?.description.slice(0, 100)}</p>
                                            <a class="btn btn-lg btn-primary rounded-pill" href="">
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                </div>
            </div>
            {/* <!-- Services End --> */}
        </>
    )
}

export default Doctors
