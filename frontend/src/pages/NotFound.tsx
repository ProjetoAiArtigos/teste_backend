import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import erro404Animation from "../assets/notfound.json";
import { Stack } from "@mui/system";

export default function NotFound() {
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/");
  };

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: erro404Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bgCustomBlack">
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Lottie options={animationOptions} height={400} width={400} />
            <Typography
              variant="h4"
              color="secondary"
              width="100%"
              align="center"
            >
              Página não encontrada.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNavigate}
            >
              Voltar à página principal
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};
