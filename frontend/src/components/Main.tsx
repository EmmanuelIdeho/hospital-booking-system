import { Box, Typography } from "@mui/material";

function Main() {
  return (
    <Box
      sx={{
        mt: 10,
        px: 3,
        py: 5,
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Hospital Booking System!
      </Typography>
      <Typography variant="body1">
        Easily book, view, and manage your hospital appointments with our streamlined system.
      </Typography>
    </Box>
  );
}

export default Main;
