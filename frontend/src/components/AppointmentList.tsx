import { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { Appointment } from "../types/Appointment";
import axios from "axios";
import { Box, Typography } from "@mui/material";

function AppointmentList() {

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    axios.get<Appointment[]>("http://localhost:8080/api/v1/appointments")
    .then(response => setAppointments(response.data))
    .catch(err => console.log("Failed to fetch appointments", err));
  }, []);
    return (
      <>
      <Typography variant="h4" textAlign="center" mt={4} mb={2}>
        Upcoming Appointments
      </Typography>
      <Box alignItems="left">
        {appointments.length === 0 ? (<Typography>No appointments found</Typography>) : 
        (appointments.map(app => (<AppointmentCard key={app.id} appointment={app}/>)))
        }
      </Box>
      </>
      
    )
  }
  
  export default AppointmentList