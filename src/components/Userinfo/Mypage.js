import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";

const Mypage = () => {
  const { userEmail, userNickname } = useUserContext();
  const [email, setEmail] = useState(userEmail);
  const [nickname, setNickname] = useState(userNickname);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEmail(userEmail);
    setNickname(userNickname);
  }, [userEmail, userNickname]);

  const deleteHandler = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/user/delete`);
      setMessage("계정이 삭제되었습니다.");
    } catch (error) {
      alert("계정 삭제를 실패했습니다.");
    }
  };

  const emailModifyHandler = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/update-email`,
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      alert("이메일 수정 실패했습니다.");
    }
  };

  const nicknameModifyHandler = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/update-nickname`,
        { nickname }
      );
      setMessage(response.data.message);
    } catch (error) {
      alert("닉네임 수정 실패했습니다.");
    }
  };

  const passwordModifyHandler = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/user/update-password`,
        { password }
      );
      setMessage(response.data.message);
    } catch (error) {
      alert("비밀번호 수정 실패했습니다");
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
                placeholder={userEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={emailModifyHandler}
              >
                이메일 수정
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Nickname</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={nickname}
                placeholder={userNickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={nicknameModifyHandler}
              >
                닉네임 수정
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Password</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={passwordModifyHandler}
              >
                비밀번호 수정
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={deleteHandler}
              >
                계정 삭제
              </Button>
            </Grid>
            {message && (
              <Grid item xs={12}>
                <Typography color="error">{message}</Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Mypage;
