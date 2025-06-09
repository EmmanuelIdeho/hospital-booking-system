package com.example.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import com.twilio.Twilio;

import jakarta.annotation.PostConstruct;

@Configuration
@ConfigurationProperties(prefix="twilio")
public class TwilioConfig {
    private String accountSID;
    private String authToken;
    private String phoneNumber;

    @PostConstruct
    public void init(){
        Twilio.init(accountSID, authToken);
    }


    public String getAccountSID() {
        return this.accountSID;
    }

    public void setAccountSID(String accountSID) {
        this.accountSID = accountSID;
    }

    public String getAuthToken() {
        return this.authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    
    
}