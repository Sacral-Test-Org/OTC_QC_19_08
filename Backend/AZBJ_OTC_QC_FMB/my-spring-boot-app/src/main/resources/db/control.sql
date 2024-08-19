-- SQL queries for the 'Previous Policy Pan Details' functionality

-- Check if parameter list exists
SELECT COUNT(*) FROM PARAM_LIST WHERE NAME = :paramName;

-- Destroy parameter list
DELETE FROM PARAM_LIST WHERE NAME = :paramName;

-- Create parameter list
INSERT INTO PARAM_LIST (NAME) VALUES (:paramName);

-- Add parameter to list
INSERT INTO PARAM_LIST_DETAILS (LIST_NAME, PARAM_KEY, PARAM_VALUE) VALUES (:paramName, :paramKey, :paramValue);

-- Call form
CALL FORM(:formName, :paramName);

-- Fetch Personal Details
SELECT first_name, middle_name, surname, DATE_OF_BIRTH
  INTO :control.pc_first_name,
       :control.pc_middle_name,
       :control.pc_last_name,
       :control.pc_dob
  FROM cp_partners
 WHERE part_id = CASE WHEN :CONTROL.ip_ph = 'IP' THEN pk_vars.ip_part_id
                      ELSE pk_vars.ph_part_id
                 END;

-- Check Previous Policies
SELECT COUNT (1)
  INTO v_pan_cnt
  FROM ocp_policy_bases a, ocp_interested_parties b, cp_partners c
 WHERE a.contract_id = b.contract_id
   AND b.partner_id = c.part_id
   AND c.tax_id = :control.pan_card
   AND a.top_indicator = 'Y'
   AND c.part_id <> pk_vars.ph_part_id
   AND a.action_code <> 'D'
   AND b.top_indicator = 'Y'
   AND b.action_code <> 'D'
   AND c.tax_id not in ('AG/NRI/60A','AG/NRI/61A')
   AND rownum = 1;

-- Validate PAN Card Format
SELECT 'Y'
  INTO v_ver_pan
  FROM DUAL
 WHERE REGEXP_LIKE (UPPER (:CONTROL.pan_card), '^[A-Z]{3}[C,P,H,F,A,T,B,L,J,G][A-Z][0-9]{4}[A-Z]');

-- Retrieve Date of Birth Details
SELECT ip_dob, ph_dob
  INTO pk_vars.ip_dob, pk_vars.ph_dob
  FROM azbj_proposal_appln_det
 WHERE appln_no = :DTLS_BLK.APPLN_NO
   AND de_flag = 'D2';

-- Retrieve Father's Name
SELECT father_name
  INTO v_father_name
  FROM azbj_partner_extn
 WHERE part_id = CASE WHEN :CONTROL.ip_ph = 'IP' THEN pk_vars.ip_part_id ELSE pk_vars.ph_part_id END;

-- Fetch PAN Details
FOR i IN (SELECT * FROM AZBJ_PAN_DTLS WHERE pan_seq_no = v_pan_seq)
LOOP
  :AZBJ_PAN_DET.PAN_NO := :control.ip_ph || ' PAN- ' || i.PAN_NUMBER;
  :AZBJ_PAN_DET.PAN_STATUS := CASE WHEN i.PAN_STATUS = 'E' THEN 'VALID' ELSE 'INVALID' END;
  :AZBJ_PAN_DET.NAME_MATCH := NVL(i.PAN_NAME, 'N');
  :AZBJ_PAN_DET.DOB_MATCH := NVL(i.PAN_DOB, 'N');
  :AZBJ_PAN_DET.SEEDING_FLAG := i.AADHAR_SEEDING;
  :control.pan_status := CASE WHEN i.PAN_STATUS = 'E' THEN 'Valid PAN' ELSE '' END;
  NEXT_RECORD;
END LOOP;

-- Validate PAN Card Details Against External Databases
CUSTOMER.AZBJ_PANCARD_VALIDATE.VALIDATE_PANCARD_V2 ('1', v_pan_det, 'OTC', :DTLS_BLK.APPLN_NO, 'APPLICATION_NO', NULL, USER, 'OTC', CASE WHEN :CONTROL.ip_ph = 'PH' THEN pk_vars.ph_part_id WHEN :CONTROL.ip_ph = 'IP' THEN pk_vars.ip_part_id END, V_RESPONSE_CODE, v_output_data, v_msg);

-- Log Validation Results
azbj_new_bbu_utilities.bbu_ins_log (:DTLS_BLK.APPLN_NO, :DTLS_BLK.APPLN_NO, 'OPS-9977_BBU:PAN: ' || :CONTROL.pan_card || ' NAME: ' || :CONTROL.pc_first_name || ' ' || :CONTROL.pc_middle_name || ' ' || :CONTROL.pc_last_name || ' DOB: ' || TO_CHAR (TO_DATE(:CONTROL.pc_dob, 'DD/MM/RRRR'), 'DD/MM/RRRR') || ' FATHER_NAME: ' || v_father_name);