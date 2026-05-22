import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Container,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useState } from "react";
import axios from "axios";
import { Appointment } from "../types/Appointment";

function ModifyForm() {
  const baseURL = import.meta.env.VITE_API_URL;
  const [searchId, setSearchID] = useState("");
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fetchAppointment = async () => {
    setNotFound(false);
    setUpdateSuccess(false);
    try {
      setLoading(true);
      const response = await axios.get<Appointment>(
        `${baseURL}/api/v1/appointments/${searchId}`
      );
      setAppointment(response.data);
    } catch (error) {
      console.error("Appointment not found", error);
      setAppointment(null);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointment((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdate = async () => {
    if (!appointment) return;
    setUpdateSuccess(false);
    try {
      const response = await axios.put<Appointment>(
        `${baseURL}/api/v1/appointments/${appointment.id}`,
        appointment
      );
      setAppointment(response.data);
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update appointment");
    }
  };

  // Allow searching by pressing Enter in the ID field
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchId) fetchAppointment();
  };

  return (
    <Container maxWidth="sm" sx={{ pt: { xs: 10, sm: 12 }, pb: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>

        {/* Page header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <EditCalendarIcon color="primary" />
          <Typography variant="h5" fontWeight={700}>
            Modify Appointment
          </Typography>
        </Box>

        {/* Search section */}
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Enter the appointment ID to look it up
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
          <TextField
            label="Appointment ID"
            value={searchId}
            onChange={(e) => setSearchID(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            size="small"
            type="number"
            inputProps={{ min: 1 }}
          />
          <Button
            onClick={fetchAppointment}
            variant="contained"
            disabled={loading || !searchId}
            startIcon={
              loading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />
            }
            sx={{ whiteSpace: "nowrap", height: 40 }}
          >
            {loading ? "Searching" : "Search"}
          </Button>
        </Box>

        {/* Not found feedback — inline instead of alert() */}
        {notFound && (
          <Alert severity="error" sx={{ mt: 2 }}>
            No appointment found for ID <strong>{searchId}</strong>.
          </Alert>
        )}

        {/* Edit form — only shown once an appointment is loaded */}
        {appointment && (
          <>
            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Editing appointment #{appointment.id}
            </Typography>

            {updateSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Appointment updated successfully.
              </Alert>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Patient Name"
                name="patientName"
                value={appointment.patientName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={appointment.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={appointment.phoneNumber}
                onChange={handleChange}
                fullWidth
              />

              {/* Date and time side by side — same pattern as BookingForm */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  value={appointment.date}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Time"
                  name="time"
                  type="time"
                  value={appointment.time}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

              <Button
                onClick={handleUpdate}
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 1, py: 1.5, fontWeight: 700, borderRadius: 2 }}
              >
                Update Appointment
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default ModifyForm;