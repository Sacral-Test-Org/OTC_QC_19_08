package com.example.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RejectDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void autoRejectRecord(String applicationNumber) {
        String sql = "UPDATE azbj_batch_items SET status = 'REJECTED' WHERE APPLICATION_NO = ?";
        jdbcTemplate.update(sql, applicationNumber);
    }

    public String retrieveContractId(String applicationNumber) {
        String sql = "SELECT CONT_ID FROM azbj_batch_items WHERE APPLICATION_NO = ? AND TRANSACTION_TYPE = 'FRP'";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, String.class);
    }

    public int generateEventNumber(String contractId) {
        String sql = "SELECT NVL(MAX(event_no) + 1, 1) FROM azbj_uw_comments WHERE contract_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{contractId}, Integer.class);
    }

    public void insertComment(int eventNumber, String contractId, String proposalNumber, String reasonLink) {
        String sql = "INSERT INTO azbj_uw_comments (event_no, contract_id, policy_no, move_code, policy_status, user_id, comment_date, comments, flag) " +
                     "VALUES (?, ?, ?, 'AZBJ_WEB_OTC', 'ACTIVE', USER, SYSDATE, ?, 'N')";
        jdbcTemplate.update(sql, eventNumber, contractId, proposalNumber, reasonLink);
    }
}
