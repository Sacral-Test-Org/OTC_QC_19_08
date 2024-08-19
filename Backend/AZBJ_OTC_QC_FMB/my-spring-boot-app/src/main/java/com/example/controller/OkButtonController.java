package com.example.controller;

import com.example.service.OkButtonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ok-button")
public class OkButtonController {

    @Autowired
    private OkButtonService okButtonService;

    @PostMapping("/click")
    public ResponseEntity<Map<String, Object>> handleOkButtonClick(@RequestBody Map<String, String> request) {
        String reasonLink = request.get("reasonLink");
        String status = request.get("status");

        Map<String, Object> result = okButtonService.processOkButtonClick(reasonLink, status);

        return ResponseEntity.ok(result);
    }
}
