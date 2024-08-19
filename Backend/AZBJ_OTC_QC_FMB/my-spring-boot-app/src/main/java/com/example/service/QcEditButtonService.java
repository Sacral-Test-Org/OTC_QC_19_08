package com.example.service;

import com.example.dao.QcEditButtonDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QcEditButtonService {

    @Autowired
    private QcEditButtonDao qcEditButtonDao;

    public Object getCaseDetails(String applicationNumber) {
        // Fetch proposal details
        Object proposalDetails = qcEditButtonDao.fetchProposalDetails(applicationNumber);
        // Fetch product ID
        Number productId = qcEditButtonDao.fetchProductId(applicationNumber);
        // Combine the fetched details and return them
        return new CaseDetails(proposalDetails, productId);
    }

    public String evaluateCaseStatus(Object caseDetails) {
        // Evaluate the status of the case based on the provided details
        // Assuming caseDetails is an instance of CaseDetails class
        CaseDetails details = (CaseDetails) caseDetails;
        String status = "";
        // Logic to evaluate status based on proposal details and product ID
        if (details.getProposalStatus().equals("APPROVED")) {
            status = "APPROVED";
        } else if (details.getProposalStatus().equals("PENDING")) {
            status = "PENDING";
        } else {
            status = "REJECTED";
        }
        return status;
    }

    // Inner class to hold case details
    private class CaseDetails {
        private Object proposalDetails;
        private Number productId;

        public CaseDetails(Object proposalDetails, Number productId) {
            this.proposalDetails = proposalDetails;
            this.productId = productId;
        }

        public String getProposalStatus() {
            // Assuming proposalDetails has a method getProposalStatus
            return ((ProposalDetails) proposalDetails).getProposalStatus();
        }
    }

    // Inner class to represent proposal details
    private class ProposalDetails {
        private String proposalStatus;

        public String getProposalStatus() {
            return proposalStatus;
        }
    }
}
