package com.example.controller;

import com.example.service.SearchService;
import com.example.model.SearchCriteria;
import com.example.model.ApplicationDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @PostMapping("/applications")
    public List<ApplicationDetails> searchApplications(@RequestBody SearchCriteria searchCriteria) {
        // 1. Receive the search criteria from the frontend.
        // 2. Call the searchApplications method from the SearchService with the search criteria.
        List<ApplicationDetails> applicationDetails = searchService.searchApplications(searchCriteria);
        // 3. Return the list of application details to the frontend.
        return applicationDetails;
    }
}
