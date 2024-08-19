-- SQL queries to fetch bank details based on IFSC code

-- Query to fetch bank details based on IFSC code
SELECT BANK_NAME, BANK_BRANCH, BANK_MICR
INTO :ACCOUNT_DET.BANK_NAME,
     :ACCOUNT_DET.ACC_BRANCH,
     :ACCOUNT_DET.MICR
FROM azbj_bank_ifsc_detail
WHERE BANK_IFSC = :ACCOUNT_DET.IFSC_CODE;

-- Query for the search window
SELECT BANK_IFSC, BANK_NAME, BANK_BRANCH, BANK_MICR
FROM azbj_bank_ifsc_detail
WHERE BANK_IFSC = :ACCOUNT_DET.IFSC_CODE;

-- Check for existing bank details
SELECT COUNT(*)
INTO v_present
FROM azbj_account_details
WHERE policy_ref = :DTLS_BLK.proposal_no;

-- Delete existing bank details
DELETE FROM azbj_account_details
WHERE policy_ref = :DTLS_BLK.proposal_no;

-- Insert new bank details
INSERT INTO azbj_account_details (
  POLICY_REF,
  CONTRACT_ID,
  PARTNER_ID,
  ACCOUNT_NO,
  COLL_BRANCH,
  IFSC_CODE,
  ACC_HOLDER_NAME,
  BANK_NAME,
  PAYEE_RELATION,
  MICR,
  TIME_STAMP,
  userid,
  Pay_mode,
  ACC_TPP_RELATION,
  RRB_BANK_ACCOUNT,
  ip_rel_with_pp
) VALUES (
  :DTLS_BLK.proposal_no,
  :control.contract_id,
  pk_vars.ip_part_id,
  :ACCOUNT_DET.ACC_NO,
  :ACCOUNT_DET.ACC_BRANCH,
  :ACCOUNT_DET.IFSC_CODE,
  :ACCOUNT_DET.ACC_HOLDER_NAME,
  :ACCOUNT_DET.BANK_NAME,
  :ACCOUNT_DET.ACC_RELATION,
  :ACCOUNT_DET.MICR,
  SYSDATE,
  USER,
  v_pay_mode,
  :ACCOUNT_DET.ACC_TPP_RELATION,
  :CONTROL.RRB_BANK_ACCOUNT,
  :ACCOUNT_DET.ip_rel_with_pp
);