package com.example.controller;

import com.example.service.DateValidationService;
import com.example.model.ValidationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DateValidationController {

    @Autowired
    private DateValidationService dateValidationService;

    @GetMapping("/validateDateRange")
    public ValidationResult validateDateRange(@RequestParam String fromDate, @RequestParam String toDate) {
        return dateValidationService.calculateDateDifference(fromDate, toDate);
    }
}
