import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <CalendarMonthIcon color="primary" fontSize="large" />,
    title: "Book",
    description: "Schedule an appointment in seconds.",
    route: "/book",
  },
  {
    icon: <EventAvailableIcon color="primary" fontSize="large" />,
    title: "View",
    description: "See all upcoming appointments in real time.",
    route: "/appointments",
  },
  {
    icon: <EditCalendarIcon color="primary" fontSize="large" />,
    title: "Modify",
    description: "Update or cancel an existing booking.",
    route: "/modify",
  },
];

function Main() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 10, sm: 12 },
        pb: 6,
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* Hero */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6 } }}>
        <LocalHospitalIcon
          color="primary"
          sx={{ fontSize: { xs: 48, sm: 64 }, mb: 1 }}
        />
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{ fontSize: { xs: "1.8rem", sm: "2.6rem", md: "3rem" }, mb: 2 }}
        >
          Hospital Booking System
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 480, mx: "auto", mb: 3 }}
        >
          Book, view, and manage hospital appointments with a streamlined,
          real-time system built for healthcare providers.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/book")}
          sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 700 }}
        >
          Book an Appointment
        </Button>
      </Box>

      <Divider sx={{ width: "100%", mb: { xs: 4, sm: 6 } }} />

      {/* Feature cards
          xs: stacked vertically — full width on phones
          sm: side by side row — three columns on tablet and up */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{ width: "100%" }}
      >
        {features.map((feature) => (
          <Paper
            key={feature.title}
            elevation={2}
            onClick={() => navigate(feature.route)}
            sx={{
              flex: 1,
              p: { xs: 3, sm: 2.5 },
              borderRadius: 3,
              textAlign: "center",
              cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box sx={{ mb: 1 }}>{feature.icon}</Box>
            <Typography variant="h6" fontWeight={700} mb={0.5}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feature.description}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default Main;