import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound(){
    const navigate = useNavigate();

    return(
        <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Go Home
      </Button>
    </Container>
    )

}

export default NotFound;