-- SQL query to calculate the difference in months between 'From Date' and 'To Date'

SELECT MONTHS_BETWEEN(TO_DATE(:TO_DATE, 'DD-MM-YYYY'), TO_DATE(:FROM_DATE, 'DD-MM-YYYY')) INTO months FROM DUAL;