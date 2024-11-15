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

const Mypage = () => {
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
            {["Email", "Nickname", "Password"].map((label) => (
              <Grid item xs={12} key={label}>
                <Typography variant="body1">{label}</Typography>
                <TextField fullWidth variant="outlined" defaultValue="Value" />
                <Button fullWidth variant="contained" color="primary">
                  Duplicate Check
                </Button>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 1 }}
              >
                Register
              </Button>

              <Button variant="contained" color="primary" fullWidth>
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Mypage;
