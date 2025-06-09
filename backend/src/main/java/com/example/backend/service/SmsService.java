package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.example.backend.config.TwilioConfig;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

import com.twilio.type.PhoneNumber;


import jakarta.annotation.PostConstruct;

@Service
public class SmsService {

    private final TwilioConfig twilioConfig;

    public SmsService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
    }

    @PostConstruct
    public void init() {
        Twilio.init(twilioConfig.getAccountSID(), twilioConfig.getAuthToken());
    }

    public void sendSms(String to, String body) {
        Message.creator(
            new PhoneNumber(to),
            new PhoneNumber(twilioConfig.getPhoneNumber()),
            body
        ).create();
    }
}
