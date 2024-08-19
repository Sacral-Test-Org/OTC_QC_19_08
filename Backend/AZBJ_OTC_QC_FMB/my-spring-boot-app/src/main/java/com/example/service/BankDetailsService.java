package com.example.service;

import com.example.dao.BankDetailsDao;
import com.example.model.BankDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankDetailsService {

    @Autowired
    private BankDetailsDao bankDetailsDao;

    public BankDetails fetchBankDetails(String ifscCode) {
        return bankDetailsDao.getBankDetails(ifscCode);
    }

    public String saveBankDetails(BankDetails bankDetails) {
        try {
            // Check if there are existing bank details for the given policy reference
            int existingCount = bankDetailsDao.checkExistingBankDetails(bankDetails.getPolicyRef());
            if (existingCount > 0) {
                // Delete existing bank details
                bankDetailsDao.deleteBankDetails(bankDetails.getPolicyRef());
            }
            // Insert new bank details
            bankDetailsDao.insertBankDetails(bankDetails);
            return "Bank details saved successfully.";
        } catch (Exception e) {
            // Handle any exceptions and return an appropriate message
            return "Error occurred while saving bank details: " + e.getMessage();
        }
    }
}
