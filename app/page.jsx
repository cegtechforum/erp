"use client";
import { Box, Typography, Button, Container, Grid2, Icon } from "@mui/material";
import Link from "next/link";
import { Event, List, RequestPage, Report } from "@mui/icons-material";

export default function HomePage() {
  return (
    <Container
      maxWidth="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0d47a1, #1976d2, #1565c0)",
        color: "#fff",
        padding: { xs: "2rem 1rem", sm: "4rem" },
      }}
    >
      {[1, 2, 3, 4, 5].map((circle, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            width: `${100 + index * 20}px`,
            height: `${100 + index * 20}px`,
            backgroundColor: "#ffffff33",
            borderRadius: "50%",
            animation: `move${circle} ${6 + index * 2}s ease-in-out infinite`, // Smooth animation
            top: `${10 + index * 15}%`,
            left: `${5 + index * 20}%`,
          }}
        />
      ))}

      {/* Heading */}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          opacity: 0,
          animation: "fadeInText 2s forwards",
          fontFamily: "'Poppins', sans-serif",
          color: "#ecf0f1",
          fontSize: { xs: "2rem", sm: "3rem" }, // Adjust font size for mobile
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
          fontFamily: "'Poppins', sans-serif",
          animation: "fadeUpAndIn 3s forwards 1s",
          color: "#bdc3c7",
          fontSize: { xs: "1.5rem", sm: "2rem" }, // Adjust font size for mobile
        }}
      >
        With a single platform
      </Typography>
      <Link href="/login" passHref>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 5,
            textTransform: "none",
            fontSize: { xs: "1rem", sm: "1.2rem" }, // Adjust font size for mobile
            backgroundColor: "#fff",
            color: "#000",
            opacity: 0,
            fontFamily: "'Poppins', sans-serif",
            animation: "fadeInText 2s forwards 2s",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#FF7F3E",
              color: "#fff",
            },
          }}
        >
          Get Started
        </Button>
      </Link>

      {/* Features Section */}
      <Box
        sx={{
          marginTop: 8,
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
          width: "80%",
          maxWidth: 800,
          opacity: 0,
          animation: "fadeInFeatures 3s forwards 3s", // Trigger animation after delay
          marginBottom: { xs: "2rem", sm: "3rem" }, // Adjust bottom margin for mobile
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          color="inherit"
          sx={{
            mb: 3,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Features
        </Typography>
        <Grid2 container spacing={4} justifyContent="center">
          {[
            { icon: Event, label: "Manage Events" },
            { icon: List, label: "Manage Items" },
            { icon: RequestPage, label: "Manage Requests" },
            { icon: Report, label: "Generate Report" },
          ].map((feature, index) => (
            <Grid2
              key={index}
              // item
              xs={12}
              sm={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Icon
                component={feature.icon}
                sx={{ fontSize: 50, color: "#ecf0f1" }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#ecf0f1",
                  marginTop: 2,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {feature.label}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeInText {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeUpAndIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInFeatures {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes move1 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(100px, 100px);
          }
          100% {
            transform: translate(0, 0); /* Make the movement loop back */
          }
        }
        @keyframes move2 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-100px, 100px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes move3 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(100px, -100px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes move4 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-100px, -100px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes move5 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(150px, 50px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </Container>
  );
}
