package com.example.backend.service;

import com.example.backend.model.Appointment;
import com.example.backend.respository.AppointmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
/*
 * Service class handles the business logic for the REST API
 */
@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository){
        this.appointmentRepository = appointmentRepository;

    }

    public Appointment saveAppointment(Appointment appointment){
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments(){
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id){
        return appointmentRepository.findById(id);
    }

    public Appointment updateAppointment(Long id, Appointment updatedAppointment){
         Optional<Appointment> existingAppointment = appointmentRepository.findById(id);
        if (existingAppointment.isPresent()) {
            Appointment appointment = existingAppointment.get();
            appointment.setPatientName(updatedAppointment.getPatientName());
            appointment.setEmail(updatedAppointment.getEmail());
            appointment.setPhoneNumber(updatedAppointment.getPhoneNumber());
            appointment.setDate(updatedAppointment.getDate());
            appointment.setTime(updatedAppointment.getTime());

            return appointmentRepository.save(appointment);
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    public void deleteAppointment(Long id){
        appointmentRepository.deleteById(id);
    }
}
