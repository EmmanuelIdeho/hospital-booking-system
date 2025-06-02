import { Appointment } from "../types/Appointment";
import { Avatar, Card, CardContent, CardHeader, Typography} from "@mui/material";
import { format, parse } from "date-fns";

interface Props {
  appointment: Appointment;
}

function AppointmentCard({ appointment }: Props) {

  const formatDate = format(new Date(appointment.date), "MMMM do yyyy");
  const parseTime = parse(appointment.time, "HH:mm:ss", new Date());
  const formatTime = format(parseTime, "h:mm a"); 

    return (
      <Card variant="outlined" sx={{ mb: 5 }}>
      <CardContent>
        <CardHeader avatar={<Avatar>{appointment.patientName[0]}</Avatar>}
        title={<Typography variant="h4" align={"left"}>{appointment.patientName}</Typography>}>  
          
        </CardHeader>
        <Typography align="left">Looks like you have your appointment on {formatDate}</Typography>
        <Typography align="left">Please arrive about 10 minutes before {formatTime}</Typography>
      </CardContent>
    </Card>
      
    )
  }
  
  export default AppointmentCard