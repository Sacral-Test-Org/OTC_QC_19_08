package com.example.service;

import com.example.dao.SearchDao;
import com.example.model.ApplicationDetails;
import com.example.model.SearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    @Autowired
    private SearchDao searchDao;

    public List<ApplicationDetails> searchApplications(SearchCriteria searchCriteria) {
        // Step 1: Receive the search criteria from the controller.

        // Step 2: Call the getApplicationDetails method from the SearchDao with the search criteria.
        List<ApplicationDetails> applicationDetailsList = searchDao.getApplicationDetails(searchCriteria);

        // Step 3: Process the retrieved application details to determine the document status.
        for (ApplicationDetails details : applicationDetailsList) {
            int biDocCount = details.getBiDocCount();
            int pfDocCount = details.getPfDocCount();
            int rpDocCount = details.getRpDocCount();
            int m017DocCount = details.getM017DocCount();
            int m202DocCount = details.getM202DocCount();

            if (biDocCount > 0 && pfDocCount > 0 && rpDocCount > 0 && m017DocCount > 0 && m202DocCount > 0) {
                details.setDocumentStatus("Documents Received");
            } else if (biDocCount == 0 && pfDocCount == 0 && rpDocCount == 0 && m017DocCount == 0 && m202DocCount == 0) {
                details.setDocumentStatus("All Documents Pending");
            } else {
                details.setDocumentStatus("Documents Not Received");
            }
        }

        // Step 4: Return the list of application details to the controller.
        return applicationDetailsList;
    }
}
