package com.example.service;

import com.example.dao.ControlDao;
import com.example.model.PersonalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ControlService {

    @Autowired
    private ControlDao controlDao;

    private String ph_part_id;
    private String PAN_CARD;
    private String PH_NAME;
    private String ph_dob;
    private String v_pan_validated;

    public void createAndCallForm() {
        String paramName = "Param1";

        // Check if parameter list exists and destroy it if it does
        controlDao.checkAndDestroyParamList(paramName);

        // Create a new parameter list
        controlDao.createParamList(paramName);

        // Add required parameters to the parameter list
        controlDao.addParamToList(paramName, "PAR_PH_PART_ID", ph_part_id);
        controlDao.addParamToList(paramName, "PAR_PAN_CARD_NO", PAN_CARD);
        controlDao.addParamToList(paramName, "PAR_MODULE", "BBU");
        controlDao.addParamToList(paramName, "PAR_PAN_PH_NAME", PH_NAME);
        controlDao.addParamToList(paramName, "PAR_PAN_PH_DOB", ph_dob);

        // Call the form with the created parameter list
        controlDao.callForm("AZBJ_OLD_POLICY_DTLS", paramName);

        // Set the variable v_pan_validated to 'Y'
        v_pan_validated = "Y";
    }

    public PersonalDetails fetchPersonalDetails(String panCardNumber) {
        return controlDao.getPersonalDetails(panCardNumber);
    }

    public boolean checkPreviousPolicies(String panCardNumber) {
        int previousPoliciesCount = controlDao.getPreviousPoliciesCount(panCardNumber);
        return previousPoliciesCount > 0;
    }

    public boolean validatePanCard(String panCard, String partnerType, String name, String dob) {
        // Validate PAN card details using ControlDao
        boolean isValid = controlDao.validatePanCard(panCard, partnerType, name, dob);
        return isValid;
    }
}
