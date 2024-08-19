package com.example.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DocumentDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int countSelectedRecords() {
        String sql = "SELECT COUNT(*) FROM deqc_display WHERE ch = 'Y'";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public String generateDocumentURL(String applicationNumber) {
        String sql = "SELECT azbj_encrypt_dms_link('NB', 'UW_VIEW_ALL', TO_CHAR(?), NULL, NULL, NULL, NULL) AS v_url FROM dual";
        return jdbcTemplate.queryForObject(sql, new Object[]{applicationNumber}, String.class);
    }
}
