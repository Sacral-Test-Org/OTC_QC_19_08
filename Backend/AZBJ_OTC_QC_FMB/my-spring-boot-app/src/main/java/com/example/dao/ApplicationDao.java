package com.example.dao;

import com.example.model.ApplicationDetails;
import com.example.model.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ApplicationDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public ApplicationDetails fetchApplicationDetails(String applicationNumber) {
        String sql = "SELECT * FROM azbj_proposal_appln_det WHERE appln_no = TO_NUMBER(?) AND de_flag = 'D2'";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, (rs, rowNum) -> {
            ApplicationDetails details = new ApplicationDetails();
            details.setApplicationNumber(rs.getString("appln_no"));
            details.setFlag(rs.getString("de_flag"));
            // Set other fields as necessary
            return details;
        });
    }

    public List<Document> fetchDocumentDetails(String applicationNumber) {
        String sql = "SELECT ip_id_proof FROM azbj_proposal_appln_det_ext WHERE appln_no = ? AND de_flag = 'D2'";
        return jdbcTemplate.query(sql, new Object[]{applicationNumber}, (rs, rowNum) -> {
            Document document = new Document();
            document.setIdProof(rs.getString("ip_id_proof"));
            // Set other fields as necessary
            return document;
        });
    }

    public void updateStatus(String applicationNumber, String status) {
        String sql = "UPDATE azbj_phub_tracker SET proposal_modif_user = USER, proposal_status = ?, proposal_modif_date = SYSDATE WHERE application_no = ?";
        jdbcTemplate.update(sql, status, applicationNumber);
    }
}
