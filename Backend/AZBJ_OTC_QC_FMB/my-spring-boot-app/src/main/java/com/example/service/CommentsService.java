package com.example.service;

import com.example.dao.CommentsDao;
import com.example.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Date;

@Service
public class CommentsService {

    @Autowired
    private CommentsDao commentsDao;

    public List<Comment> fetchComments(String userId, String profileControlValue, String contractId) {
        if (userId.startsWith("P00") || !"1".equals(profileControlValue)) {
            return commentsDao.getAllComments(contractId);
        } else if (!userId.startsWith("P00") && "1".equals(profileControlValue)) {
            return commentsDao.getCommentsWithFlagN(contractId);
        }
        return null;
    }

    public Comment fetchMostRecentComment(String contractId, int eventNo) {
        Comment comment = commentsDao.getMostRecentComment(contractId, eventNo);
        if (comment == null) {
            comment = new Comment();
            comment.setComments(null);
        }
        return comment;
    }

    public void addComment(Comment comment) {
        // Determine the next event number for the comments
        int nextEventNumber = commentsDao.getNextEventNumber(comment.getContractId());
        comment.setEventNo(nextEventNumber);
        comment.setCommentDate(new Date());
        comment.setFlag("Y");

        // Insert the comment into the database
        commentsDao.insertComment(comment);
    }
}
