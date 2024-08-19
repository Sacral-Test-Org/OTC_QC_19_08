package com.example.controller;

import com.example.service.SaveButtonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/save")
public class SaveButtonController {

    @Autowired
    private SaveButtonService saveButtonService;

    @PostMapping
    public ResponseEntity<Object> saveData(@RequestBody Object data) {
        try {
            saveButtonService.saveData(data);
            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving data: " + e.getMessage());
        }
    }
}
