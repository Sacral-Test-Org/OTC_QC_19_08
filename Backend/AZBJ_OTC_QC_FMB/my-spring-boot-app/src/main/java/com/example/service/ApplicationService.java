package com.example.service;

import com.example.dao.ApplicationDao;
import com.example.model.ApplicationDetails;
import com.example.model.Document;
import com.example.model.ValidationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationDao applicationDao;

    public ApplicationDetails getApplicationDetails(String applicationNumber) {
        return applicationDao.fetchApplicationDetails(applicationNumber);
    }

    public ValidationResult validateDocuments(ApplicationDetails applicationDetails) {
        List<Document> documents = applicationDao.fetchDocumentDetails(applicationDetails.getApplicationNumber());
        ValidationResult validationResult = new ValidationResult();

        boolean ageProofReceived = false;
        boolean identityProofReceived = false;
        boolean incomeProofReceived = false;
        boolean permanentAddressProofReceived = false;
        boolean currentAddressProofReceived = false;

        for (Document document : documents) {
            switch (document.getType()) {
                case "AGE_PROOF":
                    ageProofReceived = true;
                    break;
                case "IDENTITY_PROOF":
                    identityProofReceived = true;
                    break;
                case "INCOME_PROOF":
                    incomeProofReceived = true;
                    break;
                case "PERMANENT_ADDRESS_PROOF":
                    permanentAddressProofReceived = true;
                    break;
                case "CURRENT_ADDRESS_PROOF":
                    currentAddressProofReceived = true;
                    break;
            }
        }

        validationResult.setAgeProofReceived(ageProofReceived);
        validationResult.setIdentityProofReceived(identityProofReceived);
        validationResult.setIncomeProofReceived(incomeProofReceived);
        validationResult.setPermanentAddressProofReceived(permanentAddressProofReceived);
        validationResult.setCurrentAddressProofReceived(currentAddressProofReceived);

        return validationResult;
    }

    public void updateApplicationStatus(String applicationNumber, String status) {
        applicationDao.updateStatus(applicationNumber, status);
    }
}
