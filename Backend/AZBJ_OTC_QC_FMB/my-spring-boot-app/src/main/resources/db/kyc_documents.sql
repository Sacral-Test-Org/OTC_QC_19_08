-- SQL Queries to fetch KYC documents based on the contract ID

-- Fetch Contract ID
SELECT azbj_pk0_acc.get_contract_id(:DTLS_BLK.PROPOSAL_NO) INTO v_contract_id FROM dual;

-- Fetch Personal Details
SELECT TAX_ID, DATE_OF_BIRTH, SEX, FIRST_NAME, MIDDLE_NAME, SURNAME
INTO v_ph_pan_no, v_ph_dob, v_ph_sex, v_ph_FIRST_NAME, v_MIDDLE_NAME, v_SURNAME
FROM cp_partners a, wip_interested_parties b
WHERE CONTRACT_ID = v_contract_id
AND a.PART_ID = b.PARTNER_ID
AND b.IP_NO = 2;