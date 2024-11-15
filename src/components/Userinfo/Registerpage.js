import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registerpage = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const emailValidation = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/emailValidation`,
        {
          email,
        },
        {
          headers: { "Content-type": "application/json" },
        }
      );

      if (res.status === 200) {
        alert("사용가능한 이메일 입니다.");
        navigate("/");
      } else {
        alert(res.data.statusMessage);
      }
    } catch (error) {
      console.error(error);
      alert("이메일 중복확인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const nickNameValidation = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/emailValidation`,
        {
          nickName,
        },
        {
          headers: { "Content-type": "application/json" },
        }
      );

      if (res.status === 200) {
        alert("사용가능한 닉네임 입니다.");
        navigate("/");
      } else {
        alert(res.data.statusMessage);
      }
    } catch (error) {
      console.error(error);
      alert("닉네임 중복확인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const memberCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/register`,
        {
          email,
          nickName,
          password,
        },
        {
          headers: { "Content-type": "application/json" },
        }
      );

      if (res.status === 200) {
        alert("회원 가입 성공! 환영합니다!");
        navigate("/");
      } else {
        alert(res.data.statusMessage);
      }
    } catch (error) {
      console.error(error);
      alert("회원 가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            width: "100%",
          }}
        >
          <Typography variant="h6" gutterBottom>
            회원가입
          </Typography>
          <form onSubmit={memberCreate}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  placeholder="이메일을 입력해주세요"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nickname"
                  placeholder="닉네임을 입력해주세요"
                  fullWidth
                  variant="outlined"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  placeholder="비밀번호을 입력해주세요"
                  fullWidth
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Registerpage;
