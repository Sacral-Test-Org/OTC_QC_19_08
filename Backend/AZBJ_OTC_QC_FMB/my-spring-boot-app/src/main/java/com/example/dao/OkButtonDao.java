package com.example.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OkButtonDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int getContractId(String applicationNumber) {
        String sql = "SELECT CONT_ID FROM azbj_batch_items WHERE APPLICATION_NO = ? AND TRANSACTION_TYPE='FRP'";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, Integer.class);
    }

    public int getNextEventNumber(int contractId) {
        String sql = "SELECT NVL(MAX(event_no) + 1, 1) FROM azbj_uw_comments WHERE contract_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{contractId}, Integer.class);
    }

    public void insertComment(int eventNo, int contractId, String proposalNo, String reasonLink) {
        String sql = "INSERT INTO azbj_uw_comments (event_no, contract_id, policy_no, move_code, policy_status, user_id, comment_date, comments, flag) " +
                     "VALUES (?, ?, ?, 'AZBJ_WEB_OTC', azbj_pkg_var.v_mst, USER, SYSDATE, ?, 'N')";
        jdbcTemplate.update(sql, eventNo, contractId, proposalNo, reasonLink);
    }
}
