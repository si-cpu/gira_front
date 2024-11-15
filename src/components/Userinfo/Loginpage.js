import { CheckBox as CheckBoxIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { onLogin } = useContext(AuthContext);
  const doLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/doLogin`,
        loginData
      );
      console.log("axios로 로그인 요청 결과: ", res);

      alert("로그인 성공!");
      const token = res.data.result.token;
      const id = res.data.result.id;
      const role = jwtDecode(token).role;

      onLogin(token, id, role);
      navigate("/");
    } catch (e) {
      console.log(e);
      const errorMessage = e.response?.data?.statusMessage || "로그인 실패!";
      alert(errorMessage);
    }
  };
  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Container maxWidth="lg" sx={{ height: "1024px", position: "relative" }}>
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 296,
            left: "50%",
            transform: "translateX(-50%)",
            p: 3,
            width: 272,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Email</Typography>
              <TextField fullWidth variant="outlined" defaultValue="Value" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Password</Typography>
              <TextField fullWidth variant="outlined" defaultValue="Value" />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxIcon />}
                    checkedIcon={<CheckBoxIcon />}
                  />
                }
                label="AutoSignIn"
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary">
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Button fullWidth variant="contained" color="primary">
                    Naver
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth variant="contained" color="primary">
                    Kakao
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button fullWidth variant="contained" color="primary">
                    Github
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Link href="#" underline="hover">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Loginpage;
