-- SQL queries for the 'View Documents' functionality

-- Query to count the number of selected records
SELECT COUNT(*)
FROM deqc_display
WHERE ch = 'Y';

-- Query to generate the URL for viewing documents
SELECT azbj_encrypt_dms_link('NB', 'UW_VIEW_ALL', TO_CHAR(:deqc_display.application_number), NULL, NULL, NULL, NULL) AS v_url
FROM dual;