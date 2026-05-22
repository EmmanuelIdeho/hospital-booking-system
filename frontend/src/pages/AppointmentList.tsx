import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { Appointment } from "../types/Appointment";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function AppointmentList() {
  const baseURL = import.meta.env.VITE_API_URL;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Appointment[]>(`${baseURL}/api/v1/appointments`)
      .then((response) => setAppointments(response.data))
      .catch((err) => console.log("Failed to fetch appointments", err))
      .finally(() => setLoading(false));

    // WebSocket connection — unchanged from original
    const socket = new SockJS(`${baseURL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket.");
        stompClient.subscribe("/topic/appoint", (message) => {
          const newAppointment: Appointment = JSON.parse(message.body);
          setAppointments((prev) => [...prev, newAppointment]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    // Container gives the page consistent horizontal padding on all sizes
    // and prevents the grid from stretching too wide on large monitors.
    // The pt pushes content below the fixed AppBar on both mobile and desktop.
    <Container maxWidth="lg" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={700}
        mb={{ xs: 3, sm: 4 }}
      >
        Upcoming Appointments
      </Typography>

      {/* Loading state */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Empty state */}
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

      {/* Appointment grid
          xs: 1 column  — phones (full-width cards, easy to tap)
          sm: 2 columns — tablets
          md: 3 columns — desktops                                  */}
      {!loading && appointments.length > 0 && (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {appointments.map((app) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={app.id}>
              <AppointmentCard appointment={app} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default AppointmentList;