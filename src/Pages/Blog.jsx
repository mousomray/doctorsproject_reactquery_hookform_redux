import React from 'react';
import { useState } from 'react';
import Layout from '../Common/Layout';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { blog } from './pagesslice';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Grid, Pagination } from "@mui/material";
import Sidebar from './Sidebar';
import Loader1 from '../Common/Loader1';

const Blog = () => {

    const dispatch = useDispatch();
    const { blogslicedata, loading } = useSelector((state) => state.Bloglist);
    const [page, setPage] = useState(1);
    const itemsPerPage = 2;


    // Get Product For Use Query 
    const getBlogdata = async () => {
        const response = await dispatch(blog()); // Call Showproduct function
        return response?.payload;
    };

    // Use Query For Department
    const { isLoading, isError, data: blogdata, error, refetch } = useQuery({
        queryKey: ['blogdata'],
        queryFn: getBlogdata // This line of code work as same as useEffect()
    });

    // Calculate total pages
    const totalPages = Math.ceil(blogdata?.length / itemsPerPage);

    // Get current page data
    const currentPageData = blogdata?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // handle For Page Change
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    // Loading state handling
    if (isLoading) {
        return (
            <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
                <h1><Loader1/></h1>
            </div>
        )
    }


    // For Error
    if (isError) {
        return <h1>{error.message}</h1>;
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
                        src="/video/blog.mp4"
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
                        Blog
                    </Typography>
                </div>
                {/*Hero Section End*/}

                {/* <!-- ======= Blog Section ======= --> */}
                <section id="blog" class="blog" style={{ marginTop: '100px' }}>
                    <div class="container">

                        <div class="row">

                            <div class="col-lg-8 entries">


                                {currentPageData?.map((value) => {
                                    return (
                                        <>
                                            {/*Start Blog Area*/}
                                            <article class="entry mb-5" data-aos="fade-up">

                                                <div class="entry-img">
                                                    <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" class="img-fluid" />
                                                </div>

                                                <div>

                                                    <p><i class="far fa-calendar-alt"></i> {value ? new Date(value.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : ''}</p>


                                                </div>

                                                <h2 class="entry-title" style={{color:'primary'}}>
                                                    {value?.title}
                                                </h2>

                                                <div class="entry-content">
                                                    <p>
                                                        {value?.description.slice(0, 500)}
                                                    </p>
                                                    <div class="read-more">
                                                        <Link to={`/blogdetails/${value._id}`}>
                                                            <button type='button' className='btn-primary mb-5 mt-3' style={{ borderRadius: '30px', height: '50px', marginBottom: '100px', width: '100px' }}>Details</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </article>
                                            {/* End Blog Area */}
                                        </>
                                    );
                                })}

                                {/* Pagination Indicator*/}
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handleChangePage}
                                    color="primary"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                />

                            </div>
                            {/* <!-- End blog entries list --> */}


                            {/*Side Bar*/}
                            <Sidebar />


                        </div>

                    </div>
                </section>
                {/* <!-- End Blog Section --> */}
            </Layout>
        </>
    );
};

export default Blog;
