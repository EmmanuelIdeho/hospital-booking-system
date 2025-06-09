package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.Appointment;
import com.example.backend.service.AppointmentService;
import com.example.backend.service.SmsService;

import jakarta.validation.Valid;

@Validated
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    private SmsService smsService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService){
        this.appointmentService = appointmentService;
    }
    
    @PostMapping("/appoint")
    public ResponseEntity<Appointment> saveAppointment(@Valid @RequestBody Appointment appointment){
        try{
            Appointment newAppointment = appointmentService.saveAppointment(appointment);
            smsService.sendSms(appointment.getPhoneNumber(), 
    "Thank you for booking with us, " + appointment.getPatientName() + "! Your appointment is confirmed for " + appointment.getDate());
            return ResponseEntity.ok(newAppointment);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
    }

    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments(){
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/appointments/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable Long id){
        try{
            Optional<Appointment> appointment = appointmentService.getAppointmentById(id);
            return ResponseEntity.ok(appointment);

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/appointments/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment){
        try{
            Appointment updatedAppointment = appointmentService.updateAppointment(id, appointment);
        return ResponseEntity.ok(updatedAppointment);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id){
        try{
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok("Product deleted successfully");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    
}
