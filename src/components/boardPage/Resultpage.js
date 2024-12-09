import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { useTeam } from "../Userinfo/TeamContext";
import axios from "axios";
import jsPDF from "jspdf";

const Resultpage = () => {
  const { teamName } = useTeam();
  const [backImages, setBackImages] = useState([]); // Backpage images
  const [frontImage, setFrontImage] = useState(null); // Frontpage image
  const [teamData, setTeamData] = useState([]); // Teampage data
  const [toolData, setToolData] = useState([]); // Toolpage data
  const [urData, setUrData] = useState([]); // URpage data

  const token = sessionStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          backResponse,
          frontResponse,
          teamResponse,
          toolResponse,
          urResponse,
        ] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/board/getbe`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { teamName },
          }),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/board/getfe`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { teamName },
          }),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/board/getthema`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { teamName },
          }),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/board/gettool`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { teamName },
          }),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/board/getur`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { teamName },
          }),
        ]);

        setBackImages(backResponse.data || []);
        setFrontImage(frontResponse.data);
        setTeamData(teamResponse.data || []);
        setToolData(toolResponse.data || []);
        setUrData(urResponse.data || []);
      } catch (error) {
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("Error fetching data for Resultpage:", error);
      }
    };

    fetchData();
  }, [teamName, token]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Result Summary for ${teamName}`, 10, 10);

    // Backend Images Section
    doc.text("Backend Images:", 10, 20);
    if (backImages.length > 0) {
      backImages.forEach((image, index) => {
        doc.text(`Image ${index + 1}`, 10, 30 + index * 10);
      });
    } else {
      doc.text("No backend images available.", 10, 30);
    }

    // Frontend Image Section
    doc.text("Frontend Image:", 10, 50);
    if (frontImage) {
      doc.text("Frontend image is available.", 10, 60);
    } else {
      doc.text("No frontend image available.", 10, 60);
    }

    // Team Data Section
    doc.text("Team Members:", 10, 80);
    if (teamData.length > 0) {
      teamData.forEach((member, index) => {
        doc.text(`${member.name} (${member.role})`, 10, 90 + index * 10);
      });
    } else {
      doc.text("No team members available.", 10, 90);
    }

    // Tool Data Section
    doc.text("Tool Information:", 10, 120);
    if (toolData.length > 0) {
      toolData.forEach((tool, index) => {
        doc.text(`${tool.name} - ${tool.description}`, 10, 130 + index * 10);
      });
    } else {
      doc.text("No tool information available.", 10, 130);
    }

    // UR Data Section
    doc.text("User Requirements:", 10, 160);
    if (urData.length > 0) {
      urData.forEach((ur, index) => {
        doc.text(`${ur.name} - ${ur.description}`, 10, 170 + index * 10);
      });
    } else {
      doc.text("No user requirements available.", 10, 170);
    }

    doc.save("result_summary.pdf");
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: 1440,
          height: 1024,
          position: "relative",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={downloadPDF}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          Download as PDF
        </Button>
        <Paper
          sx={{
            width: 1200,
            height: 800,
            position: "absolute",
            top: 100,
            left: 120,
            backgroundColor: "#f2f2f2",
            borderRadius: 2,
            boxShadow: "0px 4px 4px #00000040",
            padding: 4,
            overflowY: "scroll",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            Project Result "{teamName}"
          </Typography>

          <Grid container spacing={4}>
            {/* Backend Images Section */}
            <Grid item xs={6} sx={{ width: 400, height: 600 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Backend Images
              </Typography>
              <Box display="flex" gap={2} flexDirection="column">
                {backImages.length > 0 ? (
                  backImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Backpage Image ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  ))
                ) : (
                  <Typography>No backend images available.</Typography>
                )}
              </Box>
            </Grid>

            {/* Frontend Image Section */}
            <Grid item xs={6} sx={{ width: 400, height: 600 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Frontend Image
              </Typography>
              {frontImage ? (
                <img
                  src={frontImage}
                  alt="Frontend"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <Typography>No frontend image available.</Typography>
              )}
            </Grid>

            {/* Team Members Section */}
            <Grid item xs={6} sx={{ width: 400, height: 600 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Team Members
              </Typography>
              {teamData.length > 0 ? (
                teamData.map((member, index) => (
                  <Typography key={index}>
                    {member.name} ({member.role})
                  </Typography>
                ))
              ) : (
                <Typography>No team members available.</Typography>
              )}
            </Grid>

            {/* Tool Information Section */}
            <Grid item xs={6} sx={{ width: 400, height: 600 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Tool Information
              </Typography>
              {toolData.length > 0 ? (
                toolData.map((tool, index) => (
                  <Typography key={index}>
                    {tool.name} - {tool.description}
                  </Typography>
                ))
              ) : (
                <Typography>No tool information available.</Typography>
              )}
            </Grid>

            {/* User Requirements Section */}
            <Grid item xs={6} sx={{ width: 400, height: 600 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                User Requirements
              </Typography>
              {urData.length > 0 ? (
                urData.map((ur, index) => (
                  <Typography key={index}>
                    {ur.name} - {ur.description}
                  </Typography>
                ))
              ) : (
                <Typography>No user requirements available.</Typography>
              )}
            </Grid>

            {/* Additional Information Section */}
            <Grid item xs={6} sx={{ width: 400, height: 600 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Additional Information
              </Typography>
              <Typography>No additional information available.</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Resultpage;
