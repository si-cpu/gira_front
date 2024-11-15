// 페이지 연결해야함 지금까지 로그인 마이페이지 회원가입만 연결
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={() => navigate("/")}
        >
          <img
            src="https://c.animaapp.com/MO0zgR1z/img/figma.svg"
            alt="Figma"
            style={{ width: 40 }}
          />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            key="Theme"
            sx={{ mx: 1 }}
            variant="outlined"
            color="primary"
            onClick={() => navigate("/")}
          >
            Theme
          </Button>
          <Button
            key="Team"
            sx={{ mx: 1 }}
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Team
          </Button>
          <Button
            key="Tool"
            sx={{ mx: 1 }}
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Tool
          </Button>
          <Button
            key="UR&WBS"
            sx={{ mx: 1 }}
            variant="outlined"
            color="primary"
            onClick={() => navigate("/")}
          >
            UR&WBS
          </Button>
          <Button
            key="Backend"
            sx={{ mx: 1 }}
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Backend
          </Button>
          <Button
            key="Frontend"
            sx={{ mx: 1 }}
            variant="outlined"
            color="default"
            onClick={() => navigate("/")}
          >
            Frontend
          </Button>
          <Button
            key="Result"
            sx={{ mx: 1 }}
            variant="outlined"
            color="primary"
            onClick={() => navigate("/")}
          >
            Result
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" onClick={() => navigate("/login")}>
            Sign in
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
          <Button variant="outlined" onClick={() => navigate("/mypage")}>
            MyPage
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
