package com.example.controller;

import com.example.model.BankDetails;
import com.example.service.BankDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BankDetailsController {

    @Autowired
    private BankDetailsService bankDetailsService;

    @GetMapping("/api/bank-details")
    public ResponseEntity<BankDetails> getBankDetails(@RequestParam String ifscCode) {
        BankDetails bankDetails = bankDetailsService.fetchBankDetails(ifscCode);
        if (bankDetails != null) {
            return ResponseEntity.ok(bankDetails);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/save-bank-details")
    public ResponseEntity<String> saveBankDetails(@RequestBody BankDetails bankDetails) {
        try {
            String result = bankDetailsService.saveBankDetails(bankDetails);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving bank details: " + e.getMessage());
        }
    }
}
