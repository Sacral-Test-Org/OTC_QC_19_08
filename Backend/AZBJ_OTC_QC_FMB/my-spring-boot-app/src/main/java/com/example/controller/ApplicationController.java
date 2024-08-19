package com.example.controller;

import com.example.service.ApplicationService;
import com.example.model.ApplicationDetails;
import com.example.model.ValidationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/submitApplication")
    public ResponseEntity<String> submitApplication(@RequestParam String applicationNumber) {
        try {
            // Retrieve application details
            ApplicationDetails applicationDetails = applicationService.getApplicationDetails(applicationNumber);

            // Check if the received flag is 'N'
            if ("N".equals(applicationDetails.getReceivedFlag())) {
                return ResponseEntity.badRequest().body("Please download KYC documents before proceeding.");
            }

            // Validate documents
            ValidationResult validationResult = applicationService.validateDocuments(applicationDetails);

            // Check validation result
            if (!validationResult.isValid()) {
                return ResponseEntity.badRequest().body(validationResult.getMessage());
            }

            // Update application status
            applicationService.updateApplicationStatus(applicationNumber, "COMPLETED");

            return ResponseEntity.ok("Application submitted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while submitting the application.");
        }
    }
}
