import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  AppBar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { Stack } from "@mui/system";
import { clearState, clearToken } from "../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/app";
import { updateRole } from "../features/users/userActions";


export default function Menu({component: Component, ...rest}: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isError, role } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
 
  const onLogOut = () => {
    dispatch(clearToken());
    navigate("/login");
  };

  const onChangeRole = () => {
    setLoading(true); 
    dispatch(updateRole({ role: role === 1 ? 0 : 1 }));
    setLoading(false); 
  };

  useEffect(() => {
    return () => {
      if (isError) {
        dispatch(clearState());
        navigate("/login");
      }
    }
  }, [dispatch, navigate, isError]);
  
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" elevation={1}>
        <Toolbar sx={{ pr: "24px" }}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {rest.title}
          </Typography>
          <Stack direction="row" alignItems="center">
            { role === 1 ? 
              <IconButton color="inherit" onClick={onChangeRole} disabled={loading}>
                <RemoveModeratorIcon />
              </IconButton> : 
              <IconButton color="inherit" onClick={onChangeRole} disabled={loading}>
                <AdminPanelSettingsIcon />
              </IconButton>
            }
            <IconButton color="inherit" onClick={onLogOut}>
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: "#FFFFFF",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Component {...rest}/>
        </Container>
      </Box>
    </Box>
  );
}
