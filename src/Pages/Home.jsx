import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Common/Layout'
import Service from './Service'
import Doctors from './Doctors'


const Home = () => {


    return (
        <>
            <Layout>
                {/* <!-- Hero Start --> */}
                <div class="container-fluid bg-primary py-5 mb-5 mt-5 hero-header">
                    <div class="container py-5">
                        <div class="row justify-content-start">
                            <div class="col-lg-8 text-center text-lg-start">
                                <h5 class="d-inline-block text-danger text-uppercase border-bottom border-5" style={{ borderColor: 'rgba(256, 256, 256, .3) !important'}}>Welcome To Doctor 24x7</h5>
                                <h1 class="display-1 text-black mb-md-4">Best Healthcare Solution In Your City</h1>
                                <div class="pt-2">
                                    <Link to="/department" class="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2" style={{backgroundColor:'red'}}>Appointment</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Hero End --> */}

                {/*Service Area*/}
                <Service />

                {/*Doctor Area*/}
                <Doctors />



            </Layout>
        </>
    )
}

export default Home
