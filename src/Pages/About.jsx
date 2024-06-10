import React from 'react'
import { Typography } from '@mui/material'
import Layout from '../Common/Layout'
import Personalcare from './Personalcare'
import Childcare from './Childcare'

const About = () => {
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
            src="/video/about.mp4"
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
            About Us
          </Typography>
        </div>
        {/*Hero Section End*/}

        {/*Personal Care*/}
        <Personalcare/>

        {/*Child Care*/}
        <Childcare/>

      </Layout>
    </>
  )
}

export default About
