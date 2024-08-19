package com.example.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class ControlDao {
    private final JdbcTemplate jdbcTemplate;

    public ControlDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void checkAndDestroyParamList(String paramName) {
        String sqlCheck = "SELECT COUNT(*) FROM parameter_lists WHERE name = ?";
        Integer count = jdbcTemplate.queryForObject(sqlCheck, new Object[]{paramName}, Integer.class);
        if (count != null && count > 0) {
            String sqlDelete = "DELETE FROM parameter_lists WHERE name = ?";
            jdbcTemplate.update(sqlDelete, paramName);
        }
    }

    public void createParamList(String paramName) {
        String sqlInsert = "INSERT INTO parameter_lists (name) VALUES (?)";
        jdbcTemplate.update(sqlInsert, paramName);
    }

    public void addParamToList(String paramName, String paramKey, String paramValue) {
        String sqlInsert = "INSERT INTO parameters (list_name, param_key, param_value) VALUES (?, ?, ?)";
        jdbcTemplate.update(sqlInsert, paramName, paramKey, paramValue);
    }

    public void callForm(String formName, String paramName) {
        // Assuming there's a stored procedure or some mechanism to call the form
        String sqlCall = "CALL call_form(?, ?)";
        jdbcTemplate.update(sqlCall, formName, paramName);
    }

    public Map<String, Object> getPersonalDetails(String panCardNumber) {
        String sql = "SELECT first_name, middle_name, surname, DATE_OF_BIRTH " +
                     "FROM cp_partners " +
                     "WHERE part_id = CASE WHEN :CONTROL.ip_ph = 'IP' THEN pk_vars.ip_part_id " +
                     "ELSE pk_vars.ph_part_id END";
        return jdbcTemplate.queryForMap(sql, panCardNumber);
    }

    public int getPreviousPoliciesCount(String panCardNumber) {
        String sql = "SELECT COUNT (1) " +
                     "FROM ocp_policy_bases a, ocp_interested_parties b, cp_partners c " +
                     "WHERE a.contract_id = b.contract_id " +
                     "AND b.partner_id = c.part_id " +
                     "AND c.tax_id = ? " +
                     "AND a.top_indicator = 'Y' " +
                     "AND c.part_id <> pk_vars.ph_part_id " +
                     "AND a.action_code <> 'D' " +
                     "AND b.top_indicator = 'Y' " +
                     "AND b.action_code <> 'D' " +
                     "AND c.tax_id not in ('AG/NRI/60A','AG/NRI/61A') " +
                     "AND rownum = 1";
        return jdbcTemplate.queryForObject(sql, new Object[]{panCardNumber}, Integer.class);
    }

    public boolean validatePanCard(String panCard, String partnerType, String name, String dob) {
        // Validate PAN card format
        String sqlValidatePan = "SELECT 'Y' FROM DUAL WHERE REGEXP_LIKE (UPPER(?), '^[A-Z]{3}[C,P,H,F,A,T,B,L,J,G][A-Z][0-9]{4}[A-Z]')";
        String isValidPan = jdbcTemplate.queryForObject(sqlValidatePan, new Object[]{panCard}, String.class);
        if (!"Y".equals(isValidPan)) {
            return false;
        }

        // Retrieve Date of Birth Details
        String sqlDob = "SELECT ip_dob, ph_dob FROM azbj_proposal_appln_det WHERE appln_no = ? AND de_flag = 'D2'";
        Map<String, Object> dobDetails = jdbcTemplate.queryForMap(sqlDob, partnerType);
        String ipDob = (String) dobDetails.get("ip_dob");
        String phDob = (String) dobDetails.get("ph_dob");

        // Retrieve Father's Name
        String sqlFatherName = "SELECT father_name FROM azbj_partner_extn WHERE part_id = CASE WHEN ? = 'IP' THEN ? ELSE ? END";
        String fatherName = jdbcTemplate.queryForObject(sqlFatherName, new Object[]{partnerType, ipDob, phDob}, String.class);

        // Fetch PAN Details
        String sqlPanDetails = "SELECT * FROM AZBJ_PAN_DTLS WHERE pan_seq_no = ?";
        List<Map<String, Object>> panDetails = jdbcTemplate.queryForList(sqlPanDetails, panCard);
        for (Map<String, Object> detail : panDetails) {
            String panNo = partnerType + " PAN- " + detail.get("PAN_NUMBER");
            String panStatus = "E".equals(detail.get("PAN_STATUS")) ? "VALID" : "INVALID";
            String nameMatch = detail.get("PAN_NAME") != null ? (String) detail.get("PAN_NAME") : "N";
            String dobMatch = detail.get("PAN_DOB") != null ? (String) detail.get("PAN_DOB") : "N";
            String seedingFlag = (String) detail.get("AADHAR_SEEDING");
            String controlPanStatus = "E".equals(detail.get("PAN_STATUS")) ? "Valid PAN" : "";
        }

        // Validate PAN Card Details Against External Databases
        String sqlValidateExternal = "CALL CUSTOMER.AZBJ_PANCARD_VALIDATE.VALIDATE_PANCARD_V2 ('1', ?, 'OTC', ?, 'APPLICATION_NO', NULL, USER, 'OTC', CASE WHEN ? = 'PH' THEN ? WHEN ? = 'IP' THEN ? END, ?, ?, ?)";
        jdbcTemplate.update(sqlValidateExternal, panCard, partnerType, name, dob, partnerType, ipDob, partnerType, phDob);

        // Log Validation Results
        String sqlLog = "CALL azbj_new_bbu_utilities.bbu_ins_log (?, ?, 'OPS-9977_BBU:PAN: ' || ? || ' NAME: ' || ? || ' ' || ? || ' ' || ? || ' DOB: ' || TO_CHAR (TO_DATE(?, 'DD/MM/RRRR'), 'DD/MM/RRRR') || ' FATHER_NAME: ' || ?)";
        jdbcTemplate.update(sqlLog, panCard, partnerType, name, dob, fatherName);

        return true;
    }
}
