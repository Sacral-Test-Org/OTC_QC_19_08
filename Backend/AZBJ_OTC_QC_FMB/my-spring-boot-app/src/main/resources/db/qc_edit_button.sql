-- SQL Queries for QC/Edit Button Functionality

-- Query to fetch proposal details
SELECT perm_receipt_no, proposal_no, proposal_status
INTO azbj_pkg_var.v_receipt_no, azbj_pkg_var.v_policy_ref, azbj_pkg_var.v_proposal_status
FROM azbj_phub_tracker
WHERE application_no = :deqc_display.application_number;

-- Query to fetch product ID
SELECT TO_NUMBER(product_code)
INTO v_product_id
FROM azbj_batch_items
WHERE application_no = :deqc_display.application_number
  AND transaction_type = 'FRP'
  AND NVL(PRINT, 'X') <> 'C';

-- Query to count scrutiny proposals
SELECT COUNT(*)
INTO v_cnt
FROM azbj_phub_scrutiny_prop
WHERE application_no = :deqc_display.application_number;

-- Query to count QC rights
SELECT COUNT(*)
INTO v_qc_cnt
FROM azbj_system_constants
WHERE sys_type = 'QC' AND sys_code = 'QC_RIGHTS';

-- Query to insert landing form data
INSERT INTO azbj_landing_form_data (user_id, appln_no, start_time, flag)
VALUES (USER, :deqc_display.application_number, SYSDATE, 'DEQC');

-- Query to fetch event number
SELECT NVL(MAX(event_no) + 1, 1)
INTO v_event_no
FROM azbj_uw_comments
WHERE contract_id = :control.contract_id;

-- Query to insert comments
INSERT INTO azbj_uw_comments (event_no, contract_id, policy_no, move_code, policy_status, user_id, comment_date, comments, flag)
VALUES (v_event_no, :control.contract_id, :deqc_display.proposal_no, 'AZBJ_WEB_OTC', azbj_pkg_var.v_mst, USER, SYSDATE, :deqc_saerch.reason_link, 'N');