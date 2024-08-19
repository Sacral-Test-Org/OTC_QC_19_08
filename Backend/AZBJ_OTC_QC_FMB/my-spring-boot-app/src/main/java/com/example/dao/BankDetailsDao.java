package com.example.dao;

import com.example.model.BankDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BankDetailsDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public BankDetails getBankDetails(String ifscCode) {
        String sql = "SELECT BANK_NAME, BANK_BRANCH, BANK_MICR FROM azbj_bank_ifsc_detail WHERE BANK_IFSC = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{ifscCode}, (rs, rowNum) -> {
            BankDetails bankDetails = new BankDetails();
            bankDetails.setBankName(rs.getString("BANK_NAME"));
            bankDetails.setBankBranch(rs.getString("BANK_BRANCH"));
            bankDetails.setMicr(rs.getString("BANK_MICR"));
            return bankDetails;
        });
    }

    public int checkExistingBankDetails(String policyRef) {
        String sql = "SELECT COUNT(*) FROM azbj_account_details WHERE policy_ref = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{policyRef}, Integer.class);
    }

    public void deleteBankDetails(String policyRef) {
        String sql = "DELETE FROM azbj_account_details WHERE policy_ref = ?";
        jdbcTemplate.update(sql, policyRef);
    }

    public void insertBankDetails(BankDetails bankDetails) {
        String sql = "INSERT INTO azbj_account_details (POLICY_REF, CONTRACT_ID, PARTNER_ID, ACCOUNT_NO, COLL_BRANCH, IFSC_CODE, ACC_HOLDER_NAME, BANK_NAME, PAYEE_RELATION, MICR, TIME_STAMP, userid, Pay_mode, ACC_TPP_RELATION, RRB_BANK_ACCOUNT, ip_rel_with_pp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, SYSDATE, USER, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, bankDetails.getPolicyRef(), bankDetails.getContractId(), bankDetails.getPartnerId(), bankDetails.getAccountNo(), bankDetails.getCollBranch(), bankDetails.getIfscCode(), bankDetails.getAccHolderName(), bankDetails.getBankName(), bankDetails.getPayeeRelation(), bankDetails.getMicr(), bankDetails.getPayMode(), bankDetails.getAccTppRelation(), bankDetails.getRrbBankAccount(), bankDetails.getIpRelWithPp());
    }
}
