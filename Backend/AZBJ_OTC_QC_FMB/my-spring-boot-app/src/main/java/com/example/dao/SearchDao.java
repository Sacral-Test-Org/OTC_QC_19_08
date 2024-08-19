package com.example.dao;

import com.example.model.ApplicationDetails;
import com.example.model.SearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class SearchDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String SEARCH_QUERY = "SELECT apt.application_no appno, apt.proposal_status appstatus, " +
            "abi.perm_receipt_no receiptno, abi.perm_receipt_date receiptdate, " +
            "apad.ip_title || ' ' || apad.ip_first_name || ' ' || apad.ip_middle_name || ' ' || apad.ip_last_name laname, " +
            "apad.ph_title || ' ' || apad.ph_first_name || ' ' || apad.ph_middle_name || ' ' || apad.ph_last_name phname, " +
            "azsc.sys_desc partnername, apt.received_user recuser " +
            "FROM azbj_batch_items abi, azbj_phub_tracker apt, " +
            "azbj_proposal_appln_det apad, azbj_system_constants azsc " +
            "WHERE apt.application_no = NVL (?, apt.application_no) " +
            "AND abi.agent_code = NVL (TRIM (?), abi.agent_code) " +
            "AND abi.perm_receipt_date BETWEEN NVL (?, abi.perm_receipt_date) " +
            "AND NVL (?, abi.perm_receipt_date) " +
            "AND To_Number(apt.application_no) = apad.appln_no " +
            "AND apad.appln_no = To_Number(abi.application_no) " +
            "AND apt.application_no = abi.application_no " +
            "AND apt.agent_code = apad.agent_code " +
            "AND apt.agent_code = abi.agent_code " +
            "AND apad.agent_code = abi.agent_code " +
            "AND abi.agent_code = azsc.char_value " +
            "AND apt.agent_code = azsc.char_value " +
            "AND apad.agent_code = azsc.char_value " +
            "AND apt.perm_receipt_no = abi.perm_receipt_no " +
            "AND apt.perm_receipt_no IS NOT NULL " +
            "AND abi.perm_receipt_no IS NOT NULL " +
            "AND azsc.sys_type = 'OTC' " +
            "AND azsc.sys_code = 'OTC_WEB_PARTNERS' " +
            "AND de_flag = 'D2' " +
            "AND proposal_status IN ('PENDING_FOR_BBU', 'PROPOSAL_INVOKED', 'PROPOSAL_UPDATED') " +
            "AND apt.proposal_no IS NULL";

    public List<ApplicationDetails> getApplicationDetails(SearchCriteria searchCriteria) {
        return jdbcTemplate.query(SEARCH_QUERY, new Object[]{
                searchCriteria.getApplicationNumber(),
                searchCriteria.getPartnerType(),
                searchCriteria.getFromDate(),
                searchCriteria.getToDate()
        }, new ApplicationDetailsRowMapper());
    }

    private static final class ApplicationDetailsRowMapper implements RowMapper<ApplicationDetails> {
        @Override
        public ApplicationDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
            ApplicationDetails applicationDetails = new ApplicationDetails();
            applicationDetails.setApplicationNumber(rs.getString("appno"));
            applicationDetails.setProposalStatus(rs.getString("appstatus"));
            applicationDetails.setReceiptNumber(rs.getString("receiptno"));
            applicationDetails.setReceiptDate(rs.getDate("receiptdate"));
            applicationDetails.setApplicantName(rs.getString("laname"));
            applicationDetails.setPolicyholderName(rs.getString("phname"));
            applicationDetails.setPartnerName(rs.getString("partnername"));
            applicationDetails.setReceivedUser(rs.getString("recuser"));
            return applicationDetails;
        }
    }
}
