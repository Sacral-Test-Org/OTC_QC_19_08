-- SQL Queries for submitting the application form

-- Retrieve application details
SELECT * INTO p_data FROM azbj_proposal_appln_det WHERE appln_no = TO_NUMBER(:dtls_blk.appln_no) AND de_flag = 'D2';

-- Retrieve extended address proof
SELECT ip_id_proof INTO p_data_ext_addr FROM azbj_proposal_appln_det_ext WHERE appln_no = :dtls_blk.appln_no AND de_flag = 'D2';

-- Retrieve age proof
SELECT age_proof INTO v_age_proof FROM wip_azbj_ip_ext WHERE ip_no = 1 AND contract_id = :control.contract_id;

-- Check for PhonePe flag
SELECT CASE WHEN COUNT(*) > 0 THEN 'Y' ELSE 'N' END INTO v_phonepe_flag FROM azbj_nbtab_activity_dtls WHERE application_no = :dtls_blk.appln_no AND MODULE_FLAG = 'PHONEPE';

-- Validate document types and insert records
SELECT COUNT(1) INTO v_ageproof_cnt FROM azbj_cq_doc_upload_dtls a, inf_dnm_poplists b WHERE a.doc_type = b.internal_value AND poplist_code = 'EVIDENCE_TYPE' AND a.application_no = :dtls_blk.appln_no AND a.doc_type = :cp_id.doc_type;

-- Update proposal status
UPDATE azbj_phub_tracker SET proposal_modif_user = USER, proposal_status = v_main_st, proposal_modif_date = SYSDATE WHERE application_no = :dtls_blk.appln_no;

-- Insert activity log
INSERT INTO azbj_pol_activity_log (activity_seq, effective_date, activity_date, username, contract_id, pol_activity_no, policy_ref, event_code, event_desc, comments, doc_link, request_date) VALUES (azbj_policy_log_seq.NEXTVAL, pme_api.opus_date, pme_api.opus_date, USER, :control.contract_id, v_pol_activity_no, :dtls_blk.proposal_no, NULL, :dtls_blk.comments, NULL, NULL, pme_api.opus_date);