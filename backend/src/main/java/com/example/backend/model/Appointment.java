package com.example.backend.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

@Entity //specifies that this class is an entity and must be mapped to a database table.
@Table(name="appointment")
public class Appointment {
    //specifies the primary key of the entity, and that the primary key should be generated automatically.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String patientName;

    @Column(nullable = false)
    @Email(message = "Invalid email address")
    private String email;

    @Column(nullable = false)
    @Pattern(
        regexp = "^\\+?[0-9\\-\\s]{10,20}$",
        message = "Phone number must contain only digits, spaces, or dashes, and be between 10 and 20 characters"
    )
    private String phoneNumber;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    public Appointment() {
        
    }

    public Appointment(String patientName, String email, String phoneNumber, LocalDate date, LocalTime time) {
        this.patientName = patientName;
        this.email = email;
        this.phoneNumber = phoneNumber.replaceAll("[^0-9]", "");;
        this.date = date;
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

     public String getEmail() {
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getPhoneNumber(){
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber.replaceAll("[^0-9]", "");
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());result = prime * result + ((patientName == null) ? 0 : patientName.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((phoneNumber == null) ? 0 : phoneNumber.hashCode());
        result = prime * result + ((date == null) ? 0 : date.hashCode());
        result = prime * result + ((time == null) ? 0 : time.hashCode());
        return result;
    }

   @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Appointment other = (Appointment) obj;
        if (id == null ? other.id != null : !id.equals(other.id))
            return false;
        if (patientName == null ? other.patientName != null : !patientName.equals(other.patientName))
            return false;
        if (email == null ? other.email != null : !email.equals(other.email))
            return false;
        if (phoneNumber == null ? other.phoneNumber != null : !phoneNumber.equals(other.phoneNumber))
            return false;
        if (date == null ? other.date != null : !date.equals(other.date))
            return false;
        if (time == null ? other.time != null : !time.equals(other.time))
            return false;
        return true;
    }
    
    
}