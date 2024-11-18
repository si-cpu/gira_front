import { CheckBox as CheckBoxIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
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
  const [autoSignIn, setAutoSignIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "비밀번호는 최소 8자 이상이어야 합니다.";
    }
    if (!hasLowerCase) {
      return "비밀번호에는 소문자가 포함되어야 합니다.";
    }
    if (!hasNumber) {
      return "비밀번호에는 숫자가 포함되어야 합니다.";
    }
    if (!hasSpecialChar) {
      return "비밀번호에는 특수 문자가 포함되어야 합니다.";
    }
    return "";
  };

  const doLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("이메일을 입력하세요.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("유효한 이메일 주소를 입력하세요.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }

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

      if (autoSignIn) {
        localStorage.setItem("jwtToken", token);
      } else {
        sessionStorage.setItem("jwtToken", token);
      }
      onLogin(token, id, role);
      navigate("/");
    } catch (e) {
      console.log(e);
      const errorMessage = e.response?.data?.statusMessage || "로그인 실패!";
      setPasswordError(errorMessage);
    }
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/send-verification-code`,
        { email }
      );
      alert("메일이 전송되었습니다. 이메일을 확인해주세요");
    } catch (error) {
      alert("메일 전송 실패 이메일을 다시 작성해주세요");
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
              <TextField
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Password</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxIcon />}
                    checkedIcon={<CheckBoxIcon />}
                    checked={autoSignIn}
                    onChange={(e) => setAutoSignIn(e.target.checked)}
                  />
                }
                label="AutoSignIn"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={doLogin}
              >
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
              <Link href="#" underline="hover" onClick={sendVerificationCode}>
                Forgot password?
              </Link>
            </Grid>
            {message && (
              <Grid item xs={12}>
                <Typography>{message}</Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Loginpage;
