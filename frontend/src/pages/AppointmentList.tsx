import { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { Appointment } from "../types/Appointment";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";

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
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {appointments.length === 0 ? (
          <Typography textAlign="center">No appointments found</Typography>
        ) : (
          <Grid container spacing={3}>
            {appointments.map(app => (
              <Grid  size={{ xs:12, sm:6, md:4, lg:3}} key={app.id}>
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