import AppointmentCard from "../components/AppointmentCard";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { useAppointments } from "../context/AppointmentContext";

function AppointmentList() {
  const { appointments, loading } = useAppointments();

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={700}
        mb={{ xs: 3, sm: 4 }}
      >
        Upcoming Appointments
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && appointments.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 8,
            color: "text.secondary",
          }}
        >
          <EventBusyIcon sx={{ fontSize: 56 }} />
          <Typography variant="h6">No upcoming appointments</Typography>
          <Typography variant="body2">
            Bookings will appear here once they are made.
          </Typography>
        </Box>
      )}

      {!loading && appointments.length > 0 && (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {appointments.map((app) => (
            <Grid size={{ xs: 12, sm: 12, md: 6 }} key={app.id}>
              <AppointmentCard appointment={app} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default AppointmentList;