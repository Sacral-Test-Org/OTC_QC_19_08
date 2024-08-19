package com.example.service;

import com.example.dao.RejectDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RejectService {

    @Autowired
    private RejectDao rejectDao;

    @Transactional
    public ResponseEntity<String> processReject(List<String> applicationNumbers) {
        List<String> rejectedApplications = new ArrayList<>();
        int rejectedCount = 0;

        for (String applicationNumber : applicationNumbers) {
            try {
                // Auto-reject the record
                rejectDao.autoRejectRecord(applicationNumber);

                // Retrieve the contract ID associated with the application number
                String contractId = rejectDao.retrieveContractId(applicationNumber);

                // Check if reason_link is not empty
                if (contractId != null && !contractId.isEmpty()) {
                    // Generate a new event number
                    int eventNumber = rejectDao.generateEventNumber(contractId);

                    // Insert a comment into the database
                    rejectDao.insertComment(eventNumber, contractId, applicationNumber, "Reason link");
                }

                // Commit the transaction
                rejectedApplications.add(applicationNumber);
                rejectedCount++;
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error processing application number " + applicationNumber + ": " + e.getMessage());
            }
        }

        return ResponseEntity.ok("Rejected " + rejectedCount + " records: " + String.join(", ", rejectedApplications));
    }
}
