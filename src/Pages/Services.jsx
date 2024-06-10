import React from 'react'
import { Typography } from '@mui/material'
import Layout from '../Common/Layout'
import Service from './Service'

const Services = () => {
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
                        src="/video/services.mp4"
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
                        What We Do
                    </Typography>
                </div>
                {/*Hero Section End*/}

                {/*Service Section*/}
                <Service/>
                
            </Layout>
        </>
    )
}

export default Services
