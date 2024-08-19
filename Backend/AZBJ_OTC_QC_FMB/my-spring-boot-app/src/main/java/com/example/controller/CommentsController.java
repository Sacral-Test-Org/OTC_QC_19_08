package com.example.controller;

import com.example.model.Comment;
import com.example.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    @GetMapping("/comments")
    public List<Comment> getComments(@RequestParam String userId, @RequestParam String profileControlValue) {
        return commentsService.fetchComments(userId, profileControlValue);
    }

    @GetMapping("/mostRecentComment")
    public Comment getMostRecentComment(@RequestParam String contractId, @RequestParam int eventNo) {
        return commentsService.fetchMostRecentComment(contractId, eventNo);
    }

    @PostMapping("/addComment")
    public ResponseEntity<String> addComment(@RequestBody Comment comment) {
        commentsService.addComment(comment);
        return ResponseEntity.ok("Comment has been saved successfully.");
    }
}
