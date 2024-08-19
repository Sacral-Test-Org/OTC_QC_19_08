package com.example.controller;

import com.example.service.RejectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reject")
public class RejectController {

    @Autowired
    private RejectService rejectService;

    @PostMapping("/records")
    public ResponseEntity<?> rejectRecords(@RequestBody List<String> applicationNumbers) {
        try {
            return rejectService.processReject(applicationNumbers);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred: " + e.getMessage());
        }
    }
}
