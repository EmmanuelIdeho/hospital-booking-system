import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Appointment } from "../types/Appointment";

// Shape of the context value
interface AppointmentContextType {
  appointments: Appointment[];
  loading: boolean;
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (id: number) => void;
}

// Context
const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

// Provider
export function AppointmentProvider({ children }: { children: ReactNode }) {
  const baseURL = import.meta.env.VITE_API_URL;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Appointment[]>(`${baseURL}/api/v1/appointments`)
      .then((response) => setAppointments(response.data))
      .catch((err) => console.error("Failed to fetch appointments", err))
      .finally(() => setLoading(false));

    // WebSocket
    const socket = new SockJS(`${baseURL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe("/topic/appoint", (message) => {
          const newAppointment: Appointment = JSON.parse(message.body);
          setAppointments((prev) => [...prev, newAppointment]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker error: " + frame.headers["message"]);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  // Called by BookingForm after a successful POST.
  // Adds the new appointment to the list without a network refetch.
  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  // Called by AppointmentCard after a successful DELETE.
  // Filters the cancelled appointment out of the list instantly,
  // replacing the previous window.location.reload().
  const removeAppointment = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, loading, addAppointment, removeAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

// Custom hook:
// Wrap useContext in a custom hook so consumers never import the raw context.
export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
}