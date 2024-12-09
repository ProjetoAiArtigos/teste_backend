import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  Container,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { login } from "../features/users/userActions";
import { clearState as userClearState } from "../features/users/userSlice";
import { LockOpen, Email } from "@mui/icons-material";
import MuiTextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../hooks/app";

const TextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiInputBase-fullWidth": {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 3,
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "#ffffff",
    fontSize: "larger",
  },
  "& .MuiFormLabel-root": {
    color: "#ffffff",
    fontSize: "larger",
  },
}));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true); 
    dispatch(login({ email, password }));
    setLoading(false); 
  };

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/register");
  };

  useEffect(() => {
    return () => {
      dispatch(userClearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (user.isError) {
      dispatch(userClearState());
    }
    if (user.isSuccess) {
      navigate("/");
    }
  }, [dispatch, navigate, user.isError, user.isSuccess]);

  return (
    <div id="main">
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            padding: "50px",
            height: "450px",
            width: "32rem",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            top: "40%",
            left: "50%",
            borderRadius: "10px",
            borderColor: "#fff",
            borderWidth: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "primary.light",
          }}
        >
          <Typography variant="h4" color="white">
            Sign in
          </Typography>
          <TextField
            label="Email"
            placeholder="Enter Email"
            fullWidth
            margin="normal"
            id="email"
            autoFocus
            value={email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            onChange={onChangeEmail}
            required
            variant="standard"
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            margin="normal"
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpen />
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={onChangePassword}
            required
            variant="standard"
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
            disabled={!password || !email || loading}
            onClick={handleSubmit}
          >
            Entrar
          </Button>
          <Button
            type="submit"
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
            disabled={loading}
            onClick={handleNavigate}
          >
            Registrar
          </Button>
        </Box>
      </Container>
    </div>
  );
}
