package com.example.controller;

import com.example.service.KycDocumentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@RestController
public class KycDocumentsController {

    @Autowired
    private KycDocumentsService kycDocumentsService;

    @PostMapping("/downloadKycDocuments")
    public ResponseEntity<String> downloadKycDocuments(@RequestParam String proposalNumber) {
        try {
            // Retrieve the contract ID based on the proposal number
            String contractId = kycDocumentsService.getContractId(proposalNumber);

            // Retrieve personal details from the database using the contract ID
            Map<String, String> personalDetails = kycDocumentsService.getPersonalDetails(contractId);

            // Handle any errors during the retrieval of personal details
            if (personalDetails == null) {
                return ResponseEntity.status(500).body("Error retrieving personal details");
            }

            // Format the date of birth to 'DD-MM-YYYY'
            String dob = personalDetails.get("DATE_OF_BIRTH");
            SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat outputFormat = new SimpleDateFormat("dd-MM-yyyy");
            Date date = inputFormat.parse(dob);
            String formattedDob = outputFormat.format(date);
            personalDetails.put("DATE_OF_BIRTH", formattedDob);

            // Construct a JSON string with the retrieved details
            String jsonString = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(personalDetails);

            // Send an HTTP POST request with the JSON string to a predefined URL
            ResponseEntity<String> response = kycDocumentsService.sendHttpPostRequest(jsonString);

            // Return the response from the HTTP request
            return response;
        } catch (Exception e) {
            // Handle any errors that occur during the process
            return ResponseEntity.status(500).body("Error processing request: " + e.getMessage());
        }
    }
}
