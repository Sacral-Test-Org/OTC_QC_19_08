package com.example.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DateValidationDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int getDateDifference(String fromDate, String toDate) {
        String sql = "SELECT MONTHS_BETWEEN(TO_DATE(?, 'DD-MM-YYYY'), TO_DATE(?, 'DD-MM-YYYY')) FROM DUAL";
        return jdbcTemplate.queryForObject(sql, new Object[]{toDate, fromDate}, Integer.class);
    }
}
