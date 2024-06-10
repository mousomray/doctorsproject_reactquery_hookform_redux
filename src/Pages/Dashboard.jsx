import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Layout from '../Common/Layout';
import { Avatar, Card, CardContent, Grid, Typography, Pagination } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dashboard } from './pagesslice';
import { useQuery } from '@tanstack/react-query' // Import Use Query 
import Loader1 from '../Common/Loader1';

const Dashboard = () => {

    const dispatch = useDispatch();
    const id = localStorage.getItem("id")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const phone = localStorage.getItem("phone")

    // For Pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const getDashboarddata = async () => {
        const response = await dispatch(dashboard(id))
        return response?.payload
    }

    const { isLoading, isError, data: dashboarddata, error, refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboarddata // This line of code work as same as useEffect()
    })

    console.log("Dashboard response", dashboarddata);

    // Sort the dashboard data in descending order based on createdAt
    const sortedDashboardData = dashboarddata ? [...dashboarddata].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    // Calculate total pages
    const totalPages = Math.ceil(sortedDashboardData?.length / itemsPerPage);

    // Get current page data
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const currentPageData = sortedDashboardData.slice(startIndex, endIndex);

    // Handle page change
    const handleChangePage = (event, value) => {
        setPage(value);
    };



    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1><Loader1 /></h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <Layout>
            <section style={{ margin: '2rem' }}>
                <div className="container-fluid py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <Card sx={{ borderRadius: '1rem', margin: '2rem' }}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} xl={5} sx={{ backgroundColor: 'skyblue', color: 'white', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                                        <Avatar sx={{ width: 120, height: 110 }} src="https://cdn-icons-png.flaticon.com/128/219/219970.png" />
                                        <Typography variant="h4" align="center" gutterBottom>{name}</Typography>
                                        <Typography variant="h4" align="center" gutterBottom>{email}</Typography>
                                        <Typography variant="h4" align="center" gutterBottom>{phone}</Typography>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Link to="https://www.facebook.com/"><FacebookIcon sx={{ fontSize: '2rem', color: 'white', mx: 1 }} /></Link>
                                            <Link to="https://www.twitter.com/"><TwitterIcon sx={{ fontSize: '2rem', color: 'white', mx: 1 }} /></Link>
                                            <Link to="https://www.instagram.com/"><InstagramIcon sx={{ fontSize: '2rem', color: 'white', mx: 1 }} /></Link>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>

                    </div>
                </div>


                {/*Table Area Start*/}
                <TableContainer component={Paper}>
                    <h1>Your Booking Are...</h1>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{ backgroundColor: 'skyblue', color: 'white' }}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Message</TableCell>
                                <TableCell align="center">Department</TableCell>
                                <TableCell align="center">Doctor Image</TableCell>
                                <TableCell align="center">Doctor Name</TableCell>
                                <TableCell align="center">Time</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {currentPageData.length !== 0 ? (
                                currentPageData?.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {name}
                                        </TableCell>
                                        <TableCell align="center">{row.phone}</TableCell>
                                        <TableCell align="center">
                                            {new Date(row.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                        </TableCell>
                                        <TableCell align="center">{row.message}</TableCell>
                                        <TableCell align="center">{row.department_id.departmentName}</TableCell>
                                        <TableCell align="center"><img src={`${process.env.REACT_APP_BASE_URL}${row?.doctor_id?.image}`} alt="Avatar" style={{height:'50px'}} /></TableCell>
                                        <TableCell align="center">{row.doctor_id.name}</TableCell>
                                        <TableCell align="center">{`${row?.doctor_id?.aperture_time} - ${row?.doctor_id?.departure_time}`}</TableCell>
                                        <TableCell align="center">
                                            {row?.isPending ? "Pending" : "Fulfilled"}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <p style={{ color: 'red' }}>No Booking Found</p>
                            )}

                            {/* <!-- End blog entries list --> */}
                        </TableBody>

                    </Table>
                    {/* Pagination Indicator*/}
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    />
                </TableContainer>

                {/*Table Area End*/}


            </section>


        </Layout>
    );
};

export default Dashboard;
