-- SQL Queries to fetch comments based on specified conditions

-- Get All Comments
-- Usage: When the user ID starts with 'P00%' or the profile control value is not '1'.
SELECT * FROM AZBJ_UW_COMMENTS WHERE contract_id = :control.contract_id;

-- Get Comments with Flag 'N'
-- Usage: When the user ID does not start with 'P00%' and the profile control value is '1'.
SELECT * FROM AZBJ_UW_COMMENTS WHERE contract_id = :control.contract_id AND flag = 'N';

-- Fetch Most Recent Comment
-- Usage: To retrieve the most recent comment for the given contract ID and event number.
SELECT comments
INTO   :DTLS_BLK.COMMENTS
FROM   azbj_uw_comments a
WHERE  contract_id = :control.contract_id
  AND  event_no = (SELECT MAX(event_no) 
                   FROM azbj_uw_comments b 
                   WHERE a.contract_id = b.contract_id);

-- Handle Exceptions
-- Usage: To handle exceptions and set the comments field to null if no comments are found.
EXCEPTION
   WHEN OTHERS THEN
      :DTLS_BLK.COMMENTS := NULL;

-- Determine the next event number
-- Usage: To find the next event number for the comments related to a specific contract ID.
SELECT NVL(MAX(event_no), 0) + 1
INTO v_event_no
FROM azbj_uw_comments
WHERE contract_id = :control.contract_id;

-- Insert a new comment
-- Usage: To insert a new comment into the comments table with all the necessary details.
INSERT INTO azbj_uw_comments
            (event_no, contract_id, policy_no, user_id, comment_date, comments, flag)
     VALUES (v_event_no, :control.contract_id, :dtls_blk.proposal_no, v_user, SYSDATE, :uw_comments.uw_comment, 'Y');