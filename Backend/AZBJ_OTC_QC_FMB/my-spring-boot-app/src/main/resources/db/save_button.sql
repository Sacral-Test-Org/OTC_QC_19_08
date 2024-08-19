-- SQL Queries for Save Button Functionality

-- Retrieve contract ID
SELECT cont_id
INTO :control.contract_id
FROM azbj_batch_items
WHERE application_no = :deqc_display.application_number
  AND transaction_type = 'FRP' AND ROWNUM = 1;

-- Check for rule errors
SELECT COUNT (*)
INTO v_rule_error_count
FROM bbu_trans_dtls
WHERE trans_id = v_activity_id AND action_id = 2
  AND rule_config_id IS NOT NULL
  AND version_no = (SELECT MAX (version_no)
                    FROM bbu_trans_dtls
                    WHERE trans_id = v_activity_id);

-- Update policy versions
UPDATE wip_policy_versions
SET change_description = 'PENDING_FOR_AUTO_BBU',
    contract_status = 'I'
WHERE contract_id = :control.contract_id;

-- Update hub tracker
UPDATE azbj_phub_tracker
SET proposal_modif_user = USER,
    proposal_status = 'PENDING_FOR_AUTO_BBU',
    proposal_modif_date = SYSDATE,
    locking_flag = 'N'
WHERE application_no = :deqc_display.application_number;

-- Update BBU transactions
UPDATE bbu_trans
SET proposal_no = NVL(v_policy_no, p_data.policy_ref),
    contract_id = :control.contract_id,
    user_id = USER
WHERE appl_no = :deqc_display.application_number
  AND version_no = (SELECT MAX(version_no) FROM bbu_trans
                    WHERE appl_no = :deqc_display.application_number);

-- Track hub status
BEGIN
  azbj_pk0_hub_metapara.azbj_hub_status_tracker(NULL, v_appln_no, NULL,
                                                'PENDING_FOR_AUTO_BBU',
                                                USER, SYSDATE, SYSDATE);
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END;

-- Update policy versions for FR-AR
UPDATE wip_policy_versions
SET change_description = 'FR-AR'
WHERE contract_id = :control.contract_id;

-- Update hub tracker for FR-AR
UPDATE azbj_phub_tracker
SET proposal_status = 'FR-AR',
    locking_flag = 'N'
WHERE application_no = :deqc_display.application_number;

-- Track hub status for FR-AR
BEGIN
  azbj_pk0_hub_metapara.azbj_hub_status_tracker(NULL, v_appln_no, NULL,
                                                'FR-AR_Int', USER, SYSDATE, SYSDATE);
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END;