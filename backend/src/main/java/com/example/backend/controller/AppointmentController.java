package com.example.backend.controller;

//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/")
public class AppointmentController {

    @GetMapping("/hello")
    public String helloWorld(){
        return "Hello world";
    }
}
