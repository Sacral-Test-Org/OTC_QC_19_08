-- SQL Queries for Search Functionality

-- Retrieve application details
SELECT apt.application_no appno, apt.proposal_status appstatus,
       abi.perm_receipt_no receiptno, abi.perm_receipt_date receiptdate,
       apad.ip_title || ' ' || apad.ip_first_name || ' ' || apad.ip_middle_name || ' ' || apad.ip_last_name laname,
       apad.ph_title || ' ' || apad.ph_first_name || ' ' || apad.ph_middle_name || ' ' || apad.ph_last_name phname,
       azsc.sys_desc partnername, apt.received_user recuser
FROM   azbj_batch_items abi, azbj_phub_tracker apt,
       azbj_proposal_appln_det apad, azbj_system_constants azsc
WHERE  apt.application_no = NVL (:deqc_saerch.application_no, apt.application_no)
       AND abi.agent_code = NVL (TRIM (:deqc_saerch.partner_type), abi.agent_code)
       AND abi.perm_receipt_date BETWEEN NVL (:deqc_saerch.from_date, abi.perm_receipt_date)
                                     AND NVL (:deqc_saerch.TO_DATE, abi.perm_receipt_date)
       AND To_Number(apt.application_no) = apad.appln_no
       AND apad.appln_no = To_Number(abi.application_no)
       AND apt.application_no = abi.application_no
       AND apt.agent_code = apad.agent_code
       AND apt.agent_code = abi.agent_code
       AND apad.agent_code = abi.agent_code
       AND abi.agent_code = azsc.char_value
       AND apt.agent_code = azsc.char_value
       AND apad.agent_code = azsc.char_value
       AND apt.perm_receipt_no = abi.perm_receipt_no
       AND apt.perm_receipt_no IS NOT NULL
       AND abi.perm_receipt_no IS NOT NULL
       AND azsc.sys_type = 'OTC'
       AND azsc.sys_code = 'OTC_WEB_PARTNERS'
       AND de_flag = 'D2'
       AND proposal_status IN ('PENDING_FOR_BBU', 'PROPOSAL_INVOKED', 'PROPOSAL_UPDATED')
       AND apt.proposal_no IS NULL;

-- Count specific document types
SELECT COUNT (0)
INTO   v_status_cnt
FROM   azbj_cq_doc_upload_dtls
WHERE  application_no = TO_CHAR (i.appno)
       AND UPPER (doc_type) NOT IN ('BI', 'PF');

SELECT COUNT (0)
INTO   v_bidoc_cnt
FROM   azbj_cq_doc_upload_dtls
WHERE  application_no = TO_CHAR (i.appno)
       AND UPPER (doc_type) = 'BI';

SELECT COUNT (0)
INTO   v_pfdoc_cnt
FROM   azbj_cq_doc_upload_dtls
WHERE  application_no = TO_CHAR (i.appno)
       AND UPPER (doc_type) = 'PF';

SELECT COUNT (0)
INTO   v_photodoc_cnt
FROM   azbj_cq_doc_upload_dtls
WHERE  application_no = TO_CHAR (i.appno)
       AND UPPER (doc_type) = 'RP';

SELECT COUNT (0)
INTO   v_ageproofdoc_cnt
FROM   azbj_cq_doc_upload_dtls
WHERE  application_no = TO_CHAR (i.appno)
       AND UPPER (doc_type) = 'M017';

SELECT COUNT (0)
INTO   v_addproofdoc_cnt
FROM   azbj_cq_doc_upload_dtls
WHERE  application_no = TO_CHAR (i.appno)
       AND UPPER (doc_type) = 'M202';