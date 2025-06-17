import { Appointment } from "../types/Appointment";
import { Avatar, Button, Card, CardContent, Typography} from "@mui/material";
import axios from "axios";
import { format, parse } from "date-fns";

interface Props {
  appointment: Appointment;
}

function AppointmentCard({ appointment }: Props) {

  const formatDate = format(new Date(appointment.date), "MMMM do yyyy");
  const parseTime = parse(appointment.time, "HH:mm:ss", new Date());
  const formatTime = format(parseTime, "h:mm a"); 

  const cancelAppointment = async (id: number) => {
    try{
      await axios.delete(`http://localhost:8080/api/v1/appointments/${id}`)
      alert("Successfully cancelled appointment");
      window.location.reload();
    }catch(err){
      console.log("Failed to cancel appointment", err);
    }
    
  };

    return (
      <Card variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
        height: 200,
        mx: "auto",
        my: 2,
        px: 2,
      }}
      >

      <Avatar sx={{ width: 64, height: 64, mr: 3 }}>
        {appointment.patientName?.[0]}
      </Avatar>

      <CardContent  sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}> {appointment.patientName} </Typography>
        <Typography>Has an appointment on {formatDate} at {formatTime}.</Typography>
        <Typography>Email: {appointment.email}</Typography>
        <Typography>Phone#: {appointment.phoneNumber}</Typography>
      </CardContent>
        <Button color="error" onClick={() => cancelAppointment(appointment.id ?? 0)}>
              Cancel
        </Button>
     
    </Card>
      
    )
  }
  
  export default AppointmentCard