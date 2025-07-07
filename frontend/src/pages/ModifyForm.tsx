import { Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Appointment } from "../types/Appointment";


function ModifyForm () {
    const baseURL = import.meta.env.VITE_API_URL;
   const [searchId, setSearchID] = useState("");
   const [appointment, setAppointment] = useState<Appointment | null>(null);
   const [loading, setLoading] = useState(false);

   const fetchAppointment = async () => {
    try {
        setLoading(true);
        const response = await axios.get<Appointment>(`${baseURL}/api/v1/appointments/${searchId}`);
        setAppointment(response.data);
    }catch(error){
        console.error("Appointment not found", error);
        alert("No appointment found for that ID");
        setAppointment(null);
    }finally{
        setLoading(false);
    }
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointment((prev) => prev ? {...prev, [name]: value } : null);
   };

   const handleUpdate = async() => {
    if(!appointment) return;

    try {
        const response = await axios.put<Appointment>(`${baseURL}/api/v1/appointments/${appointment.id}`, appointment);
        alert("Appointment updated successfully.");
        setAppointment(response.data);
    }catch(error){
        console.error("Update failed", error);
        alert("Failed to update appointment");
    }
   };

   return(
    <Box sx={{ 
        maxWidth: 500, 
        mx: "auto", 
        mt: 4, 
        p: 3, 
        border: "1px solid #ccc", 
        borderRadius: 2 }}>
             <Typography variant="h5" gutterBottom>Modify Appointment</Typography>
             <TextField
        label="Search by ID"
        value={searchId}
        onChange={(e) => setSearchID(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={fetchAppointment} variant="contained" disabled={loading}>Search</Button>

      {appointment && (
        <>
        <TextField
            label="Name"
            name="patientName"
            value={appointment.patientName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={appointment.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={appointment.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={appointment.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Time"
            name="time"
            type="time"
            value={appointment.time}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleUpdate} variant="contained" sx={{ mt: 2 }}>
            Update Appointment
          </Button>
        </>
      )}
    </Box>
   );
}

export default ModifyForm