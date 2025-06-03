import { Appointment } from "../types/Appointment";
import { Avatar, Button, Card, CardContent, CardHeader, Typography} from "@mui/material";
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
      <Card variant="outlined" sx={{ mb: 5 }}>
      <CardContent>
        <CardHeader avatar={<Avatar>{appointment.patientName[0]}</Avatar>}
        title={<Typography variant="h4" align={"left"}>{appointment.patientName}</Typography>}>  
          
        </CardHeader>
        <Typography align="left">Looks like you have your appointment on {formatDate}.</Typography>
        <Typography align="left">Please arrive about 10 minutes before {formatTime}.</Typography>
        <Button color="error" onClick={() => cancelAppointment(appointment.id ?? 0)}>
              Cancel
        </Button>
      </CardContent>
    </Card>
      
    )
  }
  
  export default AppointmentCard