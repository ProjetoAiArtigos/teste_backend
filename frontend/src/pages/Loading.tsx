import { Box, Container } from "@mui/material";
import Lottie from "react-lottie";
import loadingAnimation from "../assets/loading.json";

export default function Loading() {
  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
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
          <Lottie options={animationOptions} height={400} width={400} />
        </Box>
      </Container>
    </div>
  );
};
