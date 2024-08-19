package com.example.controller;

import com.example.service.QcEditButtonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QcEditButtonController {

    @Autowired
    private QcEditButtonService qcEditButtonService;

    @GetMapping("/fetchCaseDetails")
    public ResponseEntity<Object> fetchCaseDetails(@RequestParam String applicationNumber) {
        try {
            Object caseDetails = qcEditButtonService.getCaseDetails(applicationNumber);
            return ResponseEntity.ok(caseDetails);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching case details: " + e.getMessage());
        }
    }

    @GetMapping("/checkCaseStatus")
    public ResponseEntity<String> checkCaseStatus(@RequestParam String applicationNumber) {
        try {
            Object caseDetails = qcEditButtonService.getCaseDetails(applicationNumber);
            String status = qcEditButtonService.evaluateCaseStatus(caseDetails);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error checking case status: " + e.getMessage());
        }
    }
}
