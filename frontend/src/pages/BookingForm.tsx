import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";
import { Appointment } from "../types/Appointment";
import { useState } from "react";

function BookingForm() {
  const [formData, setFormData] = useState<Appointment>({
    patientName: "",
    phoneNumber: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormComplete =
    formData.patientName &&
    formData.phoneNumber &&
    formData.email &&
    formData.date &&
    formData.time;

  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAppointment: Appointment = {
        patientName: formData.patientName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        date: formData.date,
        time: formData.time,
      };
      const response = await axios.post<Appointment>(
        `${baseURL}/api/v1/appoint`,
        newAppointment
      );
      console.log(response.data);
      setFormData({
        patientName: "",
        phoneNumber: "",
        email: "",
        date: "",
        time: "",
      });
      alert(`Successfully created appointment for ${response.data.patientName}`);
    } catch (error) {
      console.log("Error booking appointment: ", error);
    }
  };

  return (
    // Outer wrapper: centres the card and pushes it below the fixed AppBar.
    // mt uses a responsive value — the AppBar is taller on desktop (64px ≈ 8
    // spacing units) than on mobile (56px ≈ 7 units), so we add a little extra
    // breathing room on top of that.
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pt: { xs: 10, sm: 12 },
        pb: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 480,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 2.5 },
          // Generous padding on desktop, tighter on mobile so the form
          // doesn't feel cramped against the screen edges.
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <CalendarMonthIcon color="primary" />
          <Typography variant="h5" fontWeight={700}>
            Book an Appointment
          </Typography>
        </Box>

        <TextField
          id="patient-name"
          label="Your Name"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          id="patient-phone-number"
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          id="patient-email"
          label="Your Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />

        {/* Date and time sit side by side on all screen sizes since they
            are short fields — this saves vertical space on mobile. */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            id="appointment-date"
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            id="appointment-time"
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Honeypot — hidden from users and screen readers */}
        <TextField
          id="clinic-code"
          label="Clinic Code"
          type="text"
          name="clinicCode"
          inputProps={{ "aria-hidden": true, tabIndex: -1 }}
          sx={{ display: "none" }}
          autoComplete="off"
        />

        <Button
          id="book"
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormComplete}
          size="large"
          fullWidth
          sx={{ mt: 1, py: 1.5, fontWeight: 700, borderRadius: 2 }}
        >
          Book Appointment
        </Button>
      </Paper>
    </Box>
  );
}

export default BookingForm;