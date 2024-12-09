import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useTeam } from "../Userinfo/TeamContext"; // TeamContext 사용

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#d9d9d9",
  boxShadow: "0px 4px 4px #00000040",
  borderRadius: theme.shape.borderRadius,
  width: "100px",
  height: "50px",
  fontFamily: "Inter-Regular, Helvetica",
  fontSize: "16px",
  textAlign: "center",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  boxShadow: "0px 4px 4px #00000040",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

const Frontpage = () => {
  const { teamName } = useTeam();
  const [frontImage, setFrontImage] = useState(null);

  const token = sessionStorage.getItem("ACCESS_TOKEN"); // 저장된 토큰 가져오기

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontImage(URL.createObjectURL(file));
    }
  };
  const handleImageDelete = () => {
    setFrontImage(null);
  };

  const handleUpload = async (event) => {};

  const joinFrontePage = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/board/getfe`,
        { teamName },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        console.log("불러오기 성공");
        setFrontImage(res.data.frontImage);
        alert("불러오기를 성공했습니다.");
      }
    } catch (error) {
      console.error("불러오기 실패:", error.response || error.message);
      alert("불러오기 중 오류가 발생했습니다.");
    }
  };

  const handleSave = async () => {
    if (!frontImage) {
      alert("이미지를 업로드해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("frontImage", frontImage);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/board/updatefe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
            "Content-Type": "application/json",
          },
        }
      );
      alert("이미지 저장 성공!");
      console.log("저장 응답:", response.data);
    } catch (error) {
      console.error("이미지 저장 실패:", error);
      alert("이미지 저장 중 오류가 발생했습니다.");
    }
  };
  useEffect(() => {
    joinFrontePage();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ height: "1024px", position: "relative" }}>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        {/* 왼쪽 영역 */}
        <Grid item xs={6}>
          <StyledPaper>
            <Typography fontSize={45} align="center">
              Front End
            </Typography>

            <Box
              sx={{
                backgroundColor: "#d9d9d9",
                borderRadius: 1,
                height: "600px",
                margin: "0 2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {frontImage ? (
                <>
                  <img
                    src={frontImage || setFrontImage}
                    alt="Front"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleImageDelete}
                    sx={{ position: "absolute", top: 10, right: 10 }}
                  >
                    삭제
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  component="label"
                  sx={{ backgroundColor: "#1976d2", color: "#fff" }}
                >
                  이미지 업로드
                  <input type="file" hidden onChange={handleImageUpload} />
                </Button>
              )}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              padding={2}
              marginTop="auto"
            >
              <StyledButton>수정</StyledButton>
              <StyledButton>저장</StyledButton>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Frontpage;
