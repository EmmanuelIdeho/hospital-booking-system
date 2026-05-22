import { Typography, Container, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: { xs: 3, sm: 4 },
      }}
    >
      {/* Large decorative 404 */}
      <Box sx={{ position: "relative", mb: 2 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", sm: "10rem" },
            fontWeight: 900,
            lineHeight: 1,
            color: "primary.main",
            opacity: 0.12,
            userSelect: "none",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Page Not Found
        </Typography>
      </Box>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 340 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<HomeIcon />}
        onClick={() => navigate("/")}
        sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 700 }}
      >
        Go Home
      </Button>
    </Container>
  );
}

export default NotFound;