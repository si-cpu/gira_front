import {
  AppBar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
  button,
} from "@mui/material";
import { Container, styled } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTeam } from "../Userinfo/TeamContext"; // TeamContext 사용

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows,
  padding: theme.spacing(2),
}));

const Titlepage = () => {
  const { teamName } = useTeam();
  const [screen, setScreen] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("");
  const [apiFields, setApiFields] = useState([
    {
      screen: "",
      name: "",
      description: "",
      deadline: "",
      owner: "",
      status: "",
    },
  ]);

  const handleApiFieldChange = (index, field, value) => {
    const updatedFields = [...apiFields];
    updatedFields[index][field] = value;
    setApiFields(updatedFields);
  };

  const addApiField = () => {
    setApiFields([
      ...apiFields,
      {
        screen: "",
        name: "",
        description: "",
        deadline: "",
        owner: "",
        status: "",
      },
    ]);
  };

  const deleteApiField = (index) => {
    const updatedFields = apiFields.filter((_, i) => i !== index);
    setApiFields(updatedFields);
  };

  const handleSave = async () => {
    const validFields = apiFields.filter(
      (field) => field.screen && field.name && field.description
    );

    if (validFields.length === 0) {
      alert("유효한 API 데이터를 입력해주세요.");
      return;
    }

    const token = sessionStorage.getItem("ACCESS_TOKEN"); // 저장된 토큰 가져오기
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/giraboard/update`,
        { apis: validFields },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
            "Content-Type": "application/json",
          },
        }
      );
      alert("API 저장 성공!");
      console.log("API 저장 응답:", response.data);
    } catch (error) {
      console.error("API 저장 실패:", error);
      alert("API 저장 중 오류가 발생했습니다.");
    }
  };
  const handleLoad = async () => {
    const token = sessionStorage.getItem("ACCESS_TOKEN"); // 저장된 토큰 가져오기
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/board/getur`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            teamName,
          },
        }
      );

      setApiFields(response.data.apis || []); // 응답 데이터를 상태로 설정
      alert("API 데이터 로드 성공!");
      console.log("API 로드 응답:", response.data);
    } catch (error) {
      console.error("API 데이터 로드 실패:", error);
      alert("불러오기 중 오류가 발생했습니다.");
    }
  };

  // useEffect로 초기 데이터 로드
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ height: "1024px", position: "relative" }}>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography
              variant="h6"
              fontSize={45}
              align="center"
              sx={{ marginBottom: 2, color: "#555" }}
            >
              UR & WBS {/* 현재 모드 표시 */}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              padding={2}
            ></Box>
            <Box
              sx={{
                width: "100%",
                height: "600px",
                overflowY: "auto",
                padding: 2,
              }}
            >
              {apiFields.map((field, index) => (
                <Box
                  key={index}
                  display="grid"
                  gridTemplateColumns="1fr 1fr 2fr 1fr 1fr 1fr auto"
                  gap={2}
                  alignItems="center"
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <TextField
                    fullWidth
                    label="요구사항 이름"
                    value={field.name}
                    onChange={(e) =>
                      handleApiFieldChange(index, "name", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="요구사항 내용"
                    value={field.description}
                    onChange={(e) =>
                      handleApiFieldChange(index, "description", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="기한"
                    value={field.deadline}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      handleApiFieldChange(index, "deadline", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="담당자"
                    value={field.owner}
                    onChange={(e) =>
                      handleApiFieldChange(index, "owner", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="확인"
                    value={field.status}
                    onChange={(e) =>
                      handleApiFieldChange(index, "status", e.target.value)
                    }
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteApiField(index)}
                  >
                    삭제
                  </Button>
                </Box>
              ))}
              <Button variant="outlined" onClick={addApiField}>
                + 추가
              </Button>
            </Box>

            <Box
              display="flex"
              justifyContent="right"
              padding={2}
              marginTop="auto"
              margin={1}
            >
              <Button onClick={handleSave}>저장</Button>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Titlepage;
