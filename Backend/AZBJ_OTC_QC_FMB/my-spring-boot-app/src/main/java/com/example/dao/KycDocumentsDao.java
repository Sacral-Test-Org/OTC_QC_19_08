package com.example.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class KycDocumentsDao {

    @Autowired
    private DataSource dataSource;

    public String fetchContractId(String proposalNumber) throws SQLException {
        String contractId = null;
        String query = "SELECT azbj_pk0_acc.get_contract_id(?) INTO v_contract_id FROM dual";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, proposalNumber);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    contractId = resultSet.getString("v_contract_id");
                }
            }
        } catch (SQLException e) {
            throw new SQLException("Error fetching contract ID", e);
        }
        return contractId;
    }

    public Map<String, String> fetchPersonalDetails(String contractId) throws SQLException {
        Map<String, String> personalDetails = new HashMap<>();
        String query = "SELECT TAX_ID, DATE_OF_BIRTH, SEX, FIRST_NAME, MIDDLE_NAME, SURNAME " +
                       "INTO v_ph_pan_no, v_ph_dob, v_ph_sex, v_ph_FIRST_NAME, v_MIDDLE_NAME, v_SURNAME " +
                       "FROM cp_partners a, wip_interested_parties b " +
                       "WHERE CONTRACT_ID = ? " +
                       "AND a.PART_ID = b.PARTNER_ID " +
                       "AND b.IP_NO = 2";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, contractId);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    personalDetails.put("TAX_ID", resultSet.getString("TAX_ID"));
                    personalDetails.put("DATE_OF_BIRTH", resultSet.getString("DATE_OF_BIRTH"));
                    personalDetails.put("SEX", resultSet.getString("SEX"));
                    personalDetails.put("FIRST_NAME", resultSet.getString("FIRST_NAME"));
                    personalDetails.put("MIDDLE_NAME", resultSet.getString("MIDDLE_NAME"));
                    personalDetails.put("SURNAME", resultSet.getString("SURNAME"));
                }
            }
        } catch (SQLException e) {
            throw new SQLException("Error fetching personal details", e);
        }
        return personalDetails;
    }
}
