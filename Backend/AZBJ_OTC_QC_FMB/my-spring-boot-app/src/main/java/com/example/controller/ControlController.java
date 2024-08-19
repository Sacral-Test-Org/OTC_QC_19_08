package com.example.controller;

import com.example.service.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/control")
public class ControlController {

    @Autowired
    private ControlService controlService;

    @GetMapping("/viewPreviousPolicyPanDetails")
    public void viewPreviousPolicyPanDetails() {
        controlService.createAndCallForm();
    }

    @GetMapping("/validatePanCard")
    public ResponseEntity<Boolean> validatePanCard(@RequestParam String panCard, 
                                                    @RequestParam String partnerType, 
                                                    @RequestParam String name, 
                                                    @RequestParam String dob) {
        boolean isValid = controlService.validatePanCard(panCard, partnerType, name, dob);
        return ResponseEntity.ok(isValid);
    }
}
