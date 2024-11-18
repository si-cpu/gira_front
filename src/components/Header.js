import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./Userinfo/UserContext";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, onLogout } = useContext(AuthContext);

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
          {isLoggedIn && (
            <>
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
            </>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {isLoggedIn ? (
            <>
              <Button variant="outlined" onClick={onLogout}>
                Log Out
              </Button>
              <Button variant="outlined" onClick={() => navigate("/mypage")}>
                MyPage
              </Button>
            </>
          ) : (
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Sign in
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
