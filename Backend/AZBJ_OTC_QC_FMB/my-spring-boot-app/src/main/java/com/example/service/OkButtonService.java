package com.example.service;

import com.example.dao.OkButtonDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OkButtonService {

    @Autowired
    private OkButtonDao okButtonDao;

    private int counter = 0;

    public String processOkButtonClick(String reasonLink, String status, String applicationNumber, String proposalNo) throws Exception {
        if (reasonLink == null || reasonLink.isEmpty()) {
            throw new Exception("Please enter comments.");
        }

        counter++;

        String message;
        switch (status) {
            case "R":
                message = "REJECT";
                // Hide current view and navigate to REJECT field
                break;
            case "LS":
                message = "LINK/SAVE";
                // Hide current view and navigate to LINKSAVE field
                break;
            case "QC":
                message = "PROPOSAL_INVOKED";
                // Hide current view and navigate to QC field
                break;
            default:
                int contractId = okButtonDao.getContractId(applicationNumber);
                int eventNo = okButtonDao.getNextEventNumber(contractId);
                okButtonDao.insertComment(eventNo, contractId, proposalNo, reasonLink);
                message = "Comment inserted successfully.";
                break;
        }

        return message;
    }
}