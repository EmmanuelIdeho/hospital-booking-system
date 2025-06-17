import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { Appointment } from "../types/Appointment";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";

function AppointmentList() {

  const baseURL = import.meta.env.VITE_API_URL;
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    axios.get<Appointment[]>(`${baseURL}api/v1/appointments`)
    .then(response => setAppointments(response.data))
    .catch(err => console.log("Failed to fetch appointments", err));
  }, []);
    return (
     <>
      <Typography variant="h4" textAlign="center" mt={4} mb={2}>
        Upcoming Appointments
      </Typography>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {appointments.length === 0 ? (
          <Typography textAlign="center">No appointments found</Typography>
        ) : (
          <Grid container justifyContent="center">
            {appointments.map((app) => (
              <Grid size={{ xs:12 }} key={app.id}>
                <AppointmentCard appointment={app} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
      
    )
  }
  
  export default AppointmentList