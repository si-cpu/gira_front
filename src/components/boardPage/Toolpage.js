import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container, styled } from "@mui/system";
import axios from "axios";
import { useTeam } from "../Userinfo/TeamContext";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows,
  padding: theme.spacing(2),
}));

const Toolpage = () => {
  const { teamName } = useTeam();
  const [toolFields, setToolFields] = useState([
    {
      type: "",
      name: "",
      version: "",
      writer: "",
      teamName: "",
      modDate: "",
    },
  ]);

  const handleToolFieldChange = (index, field, value) => {
    const updatedFields = [...toolFields];
    updatedFields[index][field] = value;
    setToolFields(updatedFields);
  };

  const addToolField = () => {
    setToolFields([
      ...toolFields,
      {
        type: "",
        name: "",
        version: "",
        writer: "",
        teamName: teamName,
      },
    ]);
  };
  const saveToolField = async (index, action) => {
    const token = sessionStorage.getItem("ACCESS_TOKEN");

    const field = toolFields[index];

    // Validate necessary fields for each action

    const payload = {
      teamName,
      [action]: [field], // Action-specific key with a single field in a list
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/board/updatetool`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`${action} 성공!`);
      console.log(`${action} 성공:`, response.data);
    } catch (error) {
      console.error(`${action} 실패:`, error);
      alert(`${action} 중 오류가 발생했습니다.`);
    }
  };

  const joinToolPage = async () => {
    const token = sessionStorage.getItem("ACCESS_TOKEN");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/board/gettool`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            teamName,
          },
        }
      );

      if (response.status === 200) {
        console.log("불러오기 성공");
        setToolFields(response.data.title || []);
      } else {
        alert("저장된 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("불러오기 실패:", error);
      alert("불러오기 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    joinToolPage();
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
              TOOL
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "600px",
                overflowY: "auto",
                padding: 2,
              }}
            >
              {toolFields.map((field, index) => (
                <Box
                  key={index}
                  display="grid"
                  gridTemplateColumns="1fr 1fr 2fr 1fr 1fr auto auto auto"
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
                    label="유형"
                    value={field.type}
                    onChange={(e) =>
                      handleToolFieldChange(index, "type", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="이름"
                    value={field.name}
                    onChange={(e) =>
                      handleToolFieldChange(index, "name", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="버전"
                    value={field.version}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      handleToolFieldChange(index, "version", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="담당자"
                    value={field.writer}
                    onChange={(e) =>
                      handleToolFieldChange(index, "writer", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="수정일"
                    value={field.modDate}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      handleToolFieldChange(index, "modDate", e.target.value)
                    }
                  />
                  {/* Add Action */}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => saveToolField(index, "addTool")}
                  >
                    추가
                  </Button>
                  {/* Edit Action */}
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => saveToolField(index, "editTool")}
                  >
                    수정
                  </Button>
                </Box>
              ))}
              <Button variant="outlined" onClick={addToolField}>
                + 추가
              </Button>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Toolpage;
