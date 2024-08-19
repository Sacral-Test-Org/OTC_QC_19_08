package com.example.dao;

import com.example.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class CommentsDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String GET_ALL_COMMENTS_QUERY = "SELECT * FROM AZBJ_UW_COMMENTS WHERE contract_id = ?";
    private static final String GET_COMMENTS_WITH_FLAG_N_QUERY = "SELECT * FROM AZBJ_UW_COMMENTS WHERE contract_id = ? AND flag = 'N'";
    private static final String GET_MOST_RECENT_COMMENT_QUERY = "SELECT comments FROM azbj_uw_comments a WHERE contract_id = ? AND event_no = (SELECT MAX(event_no) FROM azbj_uw_comments b WHERE a.contract_id = b.contract_id)";
    private static final String GET_NEXT_EVENT_NUMBER_QUERY = "SELECT NVL(MAX(event_no), 0) + 1 FROM azbj_uw_comments WHERE contract_id = ?";
    private static final String INSERT_COMMENT_QUERY = "INSERT INTO azbj_uw_comments (event_no, contract_id, policy_no, user_id, comment_date, comments, flag) VALUES (?, ?, ?, ?, SYSDATE, ?, 'Y')";

    public List<Comment> getAllComments(String contractId) {
        return jdbcTemplate.query(GET_ALL_COMMENTS_QUERY, new Object[]{contractId}, (rs, rowNum) -> {
            Comment comment = new Comment();
            comment.setId(rs.getLong("id"));
            comment.setContractId(rs.getString("contract_id"));
            comment.setText(rs.getString("text"));
            comment.setFlag(rs.getString("flag"));
            return comment;
        });
    }

    public List<Comment> getCommentsWithFlagN(String contractId) {
        return jdbcTemplate.query(GET_COMMENTS_WITH_FLAG_N_QUERY, new Object[]{contractId}, (rs, rowNum) -> {
            Comment comment = new Comment();
            comment.setId(rs.getLong("id"));
            comment.setContractId(rs.getString("contract_id"));
            comment.setText(rs.getString("text"));
            comment.setFlag(rs.getString("flag"));
            return comment;
        });
    }

    public Comment getMostRecentComment(String contractId, int eventNo) {
        try {
            return jdbcTemplate.queryForObject(GET_MOST_RECENT_COMMENT_QUERY, new Object[]{contractId, eventNo}, (rs, rowNum) -> {
                Comment comment = new Comment();
                comment.setText(rs.getString("comments"));
                return comment;
            });
        } catch (Exception e) {
            return null;
        }
    }

    public int getNextEventNumber(String contractId) {
        return jdbcTemplate.queryForObject(GET_NEXT_EVENT_NUMBER_QUERY, new Object[]{contractId}, Integer.class);
    }

    public void insertComment(Comment comment) {
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(INSERT_COMMENT_QUERY);
            ps.setInt(1, comment.getEventNo());
            ps.setString(2, comment.getContractId());
            ps.setString(3, comment.getPolicyNo());
            ps.setString(4, comment.getUserId());
            ps.setString(5, comment.getText());
            return ps;
        });
    }
}
