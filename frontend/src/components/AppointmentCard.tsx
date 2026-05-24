import { Appointment } from "../types/Appointment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import { format, parse } from "date-fns";
import { useAppointments } from "../context/AppointmentContext";

interface Props {
  appointment: Appointment;
}

function AppointmentCard({ appointment }: Props) {
  const baseURL = import.meta.env.VITE_API_URL;
  const { removeAppointment } = useAppointments();

  const formatDate = format(new Date(appointment.date), "MMMM do yyyy");
  const parseTime = parse(appointment.time, "HH:mm:ss", new Date());
  const formatTime = format(parseTime, "h:mm a");

  const avatarColours = [
    "#1976d2", "#388e3c", "#f57c00", "#7b1fa2",
    "#c62828", "#00838f", "#558b2f", "#ad1457",
  ];
  const colourIndex =
    (appointment.patientName?.charCodeAt(0) ?? 0) % avatarColours.length;

  const cancelAppointment = async (id: number) => {
    try {
      await axios.delete(`${baseURL}/api/v1/appointments/${id}`);
      removeAppointment(id);
    } catch (err) {
      console.error("Failed to cancel appointment", err);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        minWidth: 280,
        borderRadius: 3,
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: avatarColours[colourIndex],
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {appointment.patientName?.[0]?.toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              {appointment.patientName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ wordBreak: "break-word" }}
            >
              {appointment.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {appointment.phoneNumber}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          <Chip
            icon={<CalendarTodayIcon />}
            label={formatDate}
            size="small"
            variant="outlined"
            sx={{ maxWidth: "100%" }}
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={formatTime}
            size="small"
            variant="outlined"
            sx={{ maxWidth: "100%" }}
          />
        </Box>
      </CardContent>

      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          color="error"
          variant="text"
          fullWidth
          onClick={() => cancelAppointment(appointment.id ?? 0)}
          sx={{ whiteSpace: "nowrap" }}
        >
          Cancel Appointment
        </Button>
      </Box>
    </Card>
  );
}

export default AppointmentCard;