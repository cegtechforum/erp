'use client';
import { Box, Typography, Button, Container, Grid, Icon } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Event, List, RequestPage, Report } from "@mui/icons-material";

export default function HomePage() {
  const raindropContainerRef = useRef(null);

  useEffect(() => {
    const numRaindrops = 50;
    const raindropContainer = raindropContainerRef.current;

    for (let i = 0; i < numRaindrops; i++) {
      const raindrop = document.createElement('div');
      raindrop.classList.add('raindrop');
      raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
      raindrop.style.animationDelay = `${Math.random() * 2}s`;
      raindrop.style.left = `${Math.random() * 100}%`;
      raindropContainer.appendChild(raindrop);
    }
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        textAlign: "center",
        position: "relative",
        overflowY: "auto",
        background: "linear-gradient(135deg, #2c3e50, #34495e)",
        color: "#fff",
        pt: 5, // Added space at the top
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "120px",
          height: "120px",
          backgroundColor: "#ffffff33",
          borderRadius: "50%",
          animation: "move1 8s infinite linear",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "70%",
          width: "150px",
          height: "150px",
          backgroundColor: "#ffffff33",
          borderRadius: "50%",
          animation: "move2 10s infinite linear",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "40%",
          width: "130px",
          height: "130px",
          backgroundColor: "#ffffff33",
          borderRadius: "50%",
          animation: "move3 12s infinite linear",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "15%",
          width: "100px",
          height: "100px",
          backgroundColor: "#ffffff33",
          borderRadius: "50%",
          animation: "move4 15s infinite linear",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "80%",
          left: "60%",
          width: "160px",
          height: "160px",
          backgroundColor: "#ffffff33",
          borderRadius: "50%",
          animation: "move5 20s infinite linear",
        }}
      />

      <Typography 
      
        variant="h3" 
        component="h1" 
        gutterBottom 
        color="inherit"
        sx={{
          opacity: 0,
          animation: "fadeInText 2s forwards",
          color: "#ecf0f1",
        }}
      >
        Simplify Your Logistics Management
      </Typography>
      <Typography
        variant="h4"
        sx={{ 
          mb: 3, 
          maxWidth: "600px", 
          lineHeight: 1.6, 
          opacity: 0,
          animation: "fadeUpAndIn 3s forwards 1s",
          color: "#bdc3c7",
        }}
      >
       With a single platform
      </Typography>
      <Link href="/login" passHref>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            px: 5,
            py: 1.5,
            textTransform: "none",
            fontSize: "1.2rem",
            backgroundColor: "#3498db",
            color: "#fff",
            opacity: 0,
            animation: "fadeInText 2s forwards 2s",
            '&:hover': {
              transform: "scale(1.1)",
              backgroundColor: "#2980b9",
            }
          }}
        >
          Get Started
        </Button>
      </Link>

      <div className="raindrops" ref={raindropContainerRef}></div>

      <Box
        sx={{
          marginTop: 5,
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          width: "80%",
          maxWidth: 800,
          opacity: 0,
          animation: "fadeInFeatures 3s forwards 2s",
        }}
      >
        <Typography variant="h4" component="h2" color="inherit" sx={{ mb: 3 }}>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0, animation: "fadeInFeature 2s forwards 3s" }}>
            <Icon component={Event} sx={{ fontSize: 50, color: "#ecf0f1" }} />
            <Typography variant="h6" sx={{ color: "#ecf0f1", marginTop: 2 }}>
              Manage Events
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0, animation: "fadeInFeature 2s forwards 3.5s" }}>
            <Icon component={List} sx={{ fontSize: 50, color: "#ecf0f1" }} />
            <Typography variant="h6" sx={{ color: "#ecf0f1", marginTop: 2 }}>
              Manage Items
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0, animation: "fadeInFeature 2s forwards 4s" }}>
            <Icon component={RequestPage} sx={{ fontSize: 50, color: "#ecf0f1" }} />
            <Typography variant="h6" sx={{ color: "#ecf0f1", marginTop: 2 }}>
              Manage Requests
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0, animation: "fadeInFeature 2s forwards 4.5s" }}>
            <Icon component={Report} sx={{ fontSize: 50, color: "#ecf0f1" }} />
            <Typography variant="h6" sx={{ color: "#ecf0f1", marginTop: 2 }}>
              Generate Report
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <style jsx>{`
        @keyframes move1 {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(100px) translateY(-100px); }
          100% { transform: translateX(0) translateY(0); }
        }

        @keyframes move2 {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-150px) translateY(50px); }
          100% { transform: translateX(0) translateY(0); }
        }

        @keyframes move3 {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(200px) translateY(100px); }
          100% { transform: translateX(0) translateY(0); }
        }

        @keyframes move4 {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-200px) translateY(150px); }
          100% { transform: translateX(0) translateY(0); }
        }

        @keyframes move5 {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(150px) translateY(-200px); }
          100% { transform: translateX(0) translateY(0); }
        }

        @keyframes fadeInText {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes fadeUpAndIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInFeatures {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes fadeInFeature {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </Container>
  );
}
