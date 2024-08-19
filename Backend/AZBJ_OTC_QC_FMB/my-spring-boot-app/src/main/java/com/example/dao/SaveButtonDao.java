package com.example.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class SaveButtonDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String retrieveContractId(String applicationNumber, String transactionType) {
        String sql = "SELECT cont_id FROM azbj_batch_items WHERE application_no = ? AND transaction_type = ? AND ROWNUM = 1";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber, transactionType}, String.class);
    }

    public int checkRuleErrors(String activityId) {
        String sql = "SELECT COUNT(*) FROM bbu_trans_dtls WHERE trans_id = ? AND action_id = 2 AND rule_config_id IS NOT NULL AND version_no = (SELECT MAX(version_no) FROM bbu_trans_dtls WHERE trans_id = ?)";
        return jdbcTemplate.queryForObject(sql, new Object[]{activityId, activityId}, Integer.class);
    }

    public void updatePolicyVersions(String contractId) {
        String sql = "UPDATE wip_policy_versions SET change_description = 'PENDING_FOR_AUTO_BBU', contract_status = 'I' WHERE contract_id = ?";
        jdbcTemplate.update(sql, contractId);
    }

    public void updateHubTracker(String applicationNumber) {
        String sql = "UPDATE azbj_phub_tracker SET proposal_modif_user = USER, proposal_status = 'PENDING_FOR_AUTO_BBU', proposal_modif_date = SYSDATE, locking_flag = 'N' WHERE application_no = ?";
        jdbcTemplate.update(sql, applicationNumber);
    }

    public void updateBBUTransactions(String applicationNumber, String policyNo, String contractId) {
        String sql = "UPDATE bbu_trans SET proposal_no = NVL(?, p_data.policy_ref), contract_id = ?, user_id = USER WHERE appl_no = ? AND version_no = (SELECT MAX(version_no) FROM bbu_trans WHERE appl_no = ?)";
        jdbcTemplate.update(sql, policyNo, contractId, applicationNumber, applicationNumber);
    }

    public void trackHubStatus(String applicationNumber) {
        String sql = "BEGIN azbj_pk0_hub_metapara.azbj_hub_status_tracker(NULL, ?, NULL, 'PENDING_FOR_AUTO_BBU', USER, SYSDATE, SYSDATE); EXCEPTION WHEN OTHERS THEN NULL; END;";
        jdbcTemplate.update(sql, applicationNumber);
    }
}
