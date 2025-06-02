import { Appointment } from "../types/Appointment";
import { Card, CardContent, Typography} from "@mui/material";

interface Props {
  appointment: Appointment;
}

function AppointmentCard({ appointment }: Props) {

    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{appointment.patientName}</Typography>
        <Typography>{appointment.phoneNumber}</Typography>
        <Typography>{appointment.email}</Typography>
        <Typography>Date: {appointment.date}</Typography>
        <Typography>Time: {appointment.time}</Typography>
      </CardContent>
    </Card>
      
    )
  }
  
  export default AppointmentCard