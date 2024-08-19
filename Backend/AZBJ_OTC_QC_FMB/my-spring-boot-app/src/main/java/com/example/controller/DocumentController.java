package com.example.controller;

import com.example.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping("/count-selected-records")
    public ResponseEntity<Integer> countSelectedRecords() {
        int count = documentService.countSelectedRecords();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/generate-url/{applicationNumber}")
    public ResponseEntity<String> generateDocumentURL(@PathVariable String applicationNumber) {
        String url = documentService.generateDocumentURL(applicationNumber);
        if (url == null || url.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid URL. Please check the URL.");
        }
        return ResponseEntity.ok(url);
    }
}
