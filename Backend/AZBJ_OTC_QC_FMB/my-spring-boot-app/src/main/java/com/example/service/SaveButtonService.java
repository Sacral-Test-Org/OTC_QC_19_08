package com.example.service;

import com.example.dao.SaveButtonDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SaveButtonService {

    @Autowired
    private SaveButtonDao saveButtonDao;

    public void saveData(Object data) {
        // Assuming data contains applicationNumber, transactionType, activityId, and other necessary fields
        String applicationNumber = data.getApplicationNumber();
        String transactionType = data.getTransactionType();
        String activityId = data.getActivityId();
        String policyNo = data.getPolicyNo();

        // Retrieve the contract ID based on the application number and transaction type
        String contractId = saveButtonDao.retrieveContractId(applicationNumber, transactionType);

        // Call a procedure to perform auto-issuance and handle any errors
        // Assuming auto-issuance is handled within the DAO or another service

        // Display a success message if the policy number is not null
        if (policyNo != null) {
            System.out.println("Success: Policy number is " + policyNo);
        }

        // Check for rule errors and document receipt status
        int ruleErrorCount = saveButtonDao.checkRuleErrors(activityId);
        boolean documentsReceived = checkDocumentsReceived(applicationNumber); // Assuming this method exists

        // Update the status and commit changes based on the rule and document receipt status
        if (ruleErrorCount == 0 && documentsReceived) {
            saveButtonDao.updatePolicyVersions(contractId);
            saveButtonDao.updateHubTracker(applicationNumber);
            saveButtonDao.updateBBUTransactions(applicationNumber, policyNo, contractId);
            saveButtonDao.trackHubStatus(applicationNumber);
            System.out.println("Data saved successfully.");
        } else {
            System.out.println("Error: Rule validation failed or documents not received.");
            // Navigate back to the search screen
        }
    }

    private boolean checkDocumentsReceived(String applicationNumber) {
        // Implement the logic to check if documents are received
        return true; // Placeholder return value
    }
}
