-- SQL Queries for Reject Functionality

-- Retrieve Contract ID
SELECT CONT_ID INTO :control.contract_id 
FROM azbj_batch_items 
WHERE APPLICATION_NO = :deqc_display.application_number 
AND TRANSACTION_TYPE = 'FRP';

-- Generate Event Number
SELECT NVL(MAX(event_no) + 1, 1) 
INTO v_event_no 
FROM azbj_uw_comments 
WHERE contract_id = :control.contract_id;

-- Insert Comment
INSERT INTO azbj_uw_comments
(event_no, contract_id, policy_no, move_code, policy_status, user_id, comment_date, comments, flag)
VALUES
(v_event_no, :control.contract_id, :deqc_display.proposal_no, 'AZBJ_WEB_OTC', azbj_pkg_var.v_mst, USER, SYSDATE, :deqc_saerch.reason_link, 'N');