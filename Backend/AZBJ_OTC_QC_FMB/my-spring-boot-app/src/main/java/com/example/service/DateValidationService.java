package com.example.service;

import com.example.dao.DateValidationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DateValidationService {

    @Autowired
    private DateValidationDao dateValidationDao;

    public ValidationResult calculateDateDifference(String fromDate, String toDate) {
        int monthsDifference = dateValidationDao.getDateDifference(fromDate, toDate);

        if (monthsDifference > 6) {
            return new ValidationResult(false, "Date difference should not be greater than 6 months");
        }

        if (fromDate.compareTo(toDate) > 0) {
            return new ValidationResult(false, "To date should be greater than from date");
        }

        return new ValidationResult(true, "");
    }

    public static class ValidationResult {
        private boolean isValid;
        private String errorMessage;

        public ValidationResult(boolean isValid, String errorMessage) {
            this.isValid = isValid;
            this.errorMessage = errorMessage;
        }

        public boolean isValid() {
            return isValid;
        }

        public String getErrorMessage() {
            return errorMessage;
        }
    }
}
