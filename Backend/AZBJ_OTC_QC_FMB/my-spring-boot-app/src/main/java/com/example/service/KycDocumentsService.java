package com.example.service;

import com.example.dao.KycDocumentsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class KycDocumentsService {

    @Autowired
    private KycDocumentsDao kycDocumentsDao;

    private static final String POST_URL = "http://example.com/api/kyc";

    public String getContractId(String proposalNumber) {
        return kycDocumentsDao.fetchContractId(proposalNumber);
    }

    public Map<String, String> getPersonalDetails(String contractId) {
        try {
            return kycDocumentsDao.fetchPersonalDetails(contractId);
        } catch (Exception e) {
            // Handle exception and set personal details to null
            return null;
        }
    }

    public ResponseEntity<String> sendHttpPostRequest(String jsonString) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(POST_URL, jsonString, String.class);
    }

    public void downloadKycDocuments(String proposalNumber) {
        // Set received flag to 'Y'
        String receivedFlag = "Y";

        // Retrieve the contract ID based on the proposal number
        String contractId = getContractId(proposalNumber);

        // Retrieve personal details using the contract ID
        Map<String, String> personalDetails = getPersonalDetails(contractId);

        if (personalDetails != null) {
            // Format the date of birth to 'DD-MM-YYYY'
            String dob = personalDetails.get("DATE_OF_BIRTH");
            try {
                Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dob);
                String formattedDob = new SimpleDateFormat("dd-MM-yyyy").format(date);
                personalDetails.put("DATE_OF_BIRTH", formattedDob);
            } catch (Exception e) {
                // Handle date parsing exception
                personalDetails.put("DATE_OF_BIRTH", null);
            }

            // Construct a JSON string with the retrieved details
            String jsonString = constructJsonString(personalDetails);

            // Send an HTTP POST request with the JSON string to a predefined URL
            ResponseEntity<String> response = sendHttpPostRequest(jsonString);

            // Display a message with the response from the HTTP request
            System.out.println("Response: " + response.getBody());

            // Navigate to a specific block and iterate through the records
            // For each record, if the request code matches specific values ('M107', 'M253', 'M106'), set the document received status to 'Y'
            // Ensure that the document received status field is visible and editable
            // Handle any errors that occur during the iteration and display an error message
            // (This part is assumed to be handled elsewhere in the application)
        } else {
            System.out.println("Error: Unable to retrieve personal details.");
        }
    }

    private String constructJsonString(Map<String, String> personalDetails) {
        // Construct JSON string from personal details map
        return new HashMap<>(personalDetails).toString();
    }
}
