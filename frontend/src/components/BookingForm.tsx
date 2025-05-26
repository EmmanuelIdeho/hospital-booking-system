import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
    });
    alert("Submitted!");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
        mt: 4,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Book an Appointment
      </Typography>

      <TextField
        label="Your Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Phone number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <TextField
        label="Your Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <TextField
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <TextField
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Book Now
      </Button>
    </Box>
  );
}

export default BookingForm;
