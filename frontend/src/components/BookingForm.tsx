import { Box, Button, TextField, Typography } from "@mui/material";
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
    const {name, value} = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAppointment: Appointment = {
        patientName: formData.patientName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        date: formData.date,
        time: formData.time
      };
      const response = await axios.post<Appointment>("http://localhost:8080/api/v1/appoint", newAppointment); 
      console.log(response.data);
      setFormData({
        patientName: "",
        phoneNumber: "",
        email: "",
        date: "",
        time: "",
      });

      alert(`Successfully created appointment for ${response.data.patientName}`);

    } catch(error){
     console.log("Error booking appointment: ", error);
    }
    
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
        name="patientName"
        value={formData.patientName}
        onChange={handleChange}
        required
      />

      <TextField
        label="Phone number"
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
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

      <TextField
    type="text"
    name="clinicCode"
    style={{ display: "none" }}
    autoComplete="off"
    />

      <Button type="submit" variant="contained" color="primary">
        Book Now
      </Button>
    </Box>
  );
}

export default BookingForm;
