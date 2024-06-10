import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query' // Import for useQuery
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { blogdetails } from './pagesslice'
import { Typography } from '@mui/material'
import Comment from './Comment'
import Layout from '../Common/Layout'
import Sidebar from './Sidebar'
import Loader1 from '../Common/Loader1'

const Blogdetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    // Get Product For Use Query 
    const getBlogdetails = async () => {
        const response = await dispatch(blogdetails(id))
        return response?.payload
    }

    // Use Query For Department
    const { isLoading, isError, data: blogdetailsdata, error, refetch } = useQuery({
        queryKey: ['blogdetails', id],
        queryFn: getBlogdetails // This line of code work as same as useEffect()
    })

    console.log("Blogggg", blogdetailsdata);

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
                        src="/video/bd.mp4"
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
                        Blog Details
                    </Typography>
                </div>
                {/*Hero Section End*/}

                {/* <!-- ======= Blog Section ======= --> */}
                <section id="blog" class="blog" style={{ marginTop: '100px' }}>
                    <div class="container">

                        <div class="row">

                            <div class="col-lg-8 entries">



                                <article class="entry entry-single" data-aos="fade-up">
                                    <div class="entry-img">
                                        <img src={`${process.env.REACT_APP_BASE_URL}${blogdetailsdata?.image}`} alt="" class="img-fluid" />
                                    </div>
                                    <h2 class="entry-title" style={{ color: 'blue' }}>
                                        {blogdetailsdata?.title}
                                    </h2>

                                    <div class="entry-content">
                                        <p>
                                            {blogdetailsdata?.description}
                                        </p>

                                    </div>

                                </article>

                                {/*Comment Area*/}
                                <Comment />


                            </div>

                            {/*Side Bar*/}
                            <Sidebar />
                        </div>
                    </div>
                </section>

            </Layout>

        </>
    )
}

export default Blogdetails


