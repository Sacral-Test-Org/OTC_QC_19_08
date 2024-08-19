package com.example.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class QcEditButtonDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> fetchProposalDetails(String applicationNumber) {
        String sql = "SELECT perm_receipt_no, proposal_no, proposal_status " +
                     "FROM azbj_phub_tracker " +
                     "WHERE application_no = ?";
        return jdbcTemplate.queryForMap(sql, applicationNumber);
    }

    public int fetchProductId(String applicationNumber) {
        String sql = "SELECT TO_NUMBER(product_code) " +
                     "FROM azbj_batch_items " +
                     "WHERE application_no = ? " +
                     "AND transaction_type = 'FRP' " +
                     "AND NVL(PRINT, 'X') <> 'C'";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, Integer.class);
    }

    public int countScrutinyProposals(String applicationNumber) {
        String sql = "SELECT COUNT(*) " +
                     "FROM azbj_phub_scrutiny_prop " +
                     "WHERE application_no = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, Integer.class);
    }

    public int countQcRights() {
        String sql = "SELECT COUNT(*) " +
                     "FROM azbj_system_constants " +
                     "WHERE sys_type = 'QC' AND sys_code = 'QC_RIGHTS'";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public void insertLandingFormData(String userId, String applicationNumber) {
        String sql = "INSERT INTO azbj_landing_form_data (user_id, appln_no, start_time, flag) " +
                     "VALUES (?, ?, SYSDATE, 'DEQC')";
        jdbcTemplate.update(sql, userId, applicationNumber);
    }

    public int fetchEventNumber(String contractId) {
        String sql = "SELECT NVL(MAX(event_no) + 1, 1) " +
                     "FROM azbj_uw_comments " +
                     "WHERE contract_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{contractId}, Integer.class);
    }

    public void insertComments(int eventNo, String contractId, String proposalNo, String moveCode, String policyStatus, String userId, String comments) {
        String sql = "INSERT INTO azbj_uw_comments (event_no, contract_id, policy_no, move_code, policy_status, user_id, comment_date, comments, flag) " +
                     "VALUES (?, ?, ?, ?, ?, ?, SYSDATE, ?, 'N')";
        jdbcTemplate.update(sql, eventNo, contractId, proposalNo, moveCode, policyStatus, userId, comments);
    }
}
