select name from (select first_name||last_name FROM `users`
    WHERE frst_name LIKE "%John%" or last name like "%doe%") where name like '%John Doe%'

select name from (select FirstName||LastName from `patients` p
where p.FirstName like "%kulkarni" or p.LastName like "%sujay") where name like '%sujay kulkarni%';

SELECT CONCAT_WS(' ', FirstName, LastName) AS name FROM `patients`
WHERE CONCAT_WS(FirstName, LastName) LIKE "%sujay kulkarni%";

SELECT CONCAT_WS(' ', FirstName, LastName) AS name FROM `patients` where FirstName like '%sujay' and Lastname like '%kulkarni';

SELECT CONCAT_WS(' ', FirstName, LastName) AS name FROM `patients` where FirstName like '%sujay' and Lastname like '%kulkarni' or
  FirstName like '%kulkarni' and LastName like '%sujay';

  SELECT * FROM `patients` where FirstName like '%sujay' and Lastname like '%kulkarni' or
    FirstName like '%kulkarni' and LastName like '%sujay';

SELECT * FROM `patients` where FirstName like '%sujay' and Lastname like '%kulkarni' or FirstName like '%kulkarni'
and LastName like '%sujay' or ContactNumber = '9922962322';

SELECT * FROM `patients` where FirstName like '%sujay' and Lastname like '%kulkarni' or FirstName like '%kulkarni'
and LastName like '%sujay' and ContactNumber = '9922962322';

SELECT * FROM `patients` where FirstName like '%sujay' and Lastname like '%kulkarni' or FirstName like '%kulkarni'
and LastName like '%sujay' and ContactNumber = '9922962322' and UHID= '1234';

SELECT * FROM patients where FirstName like 'sujay' and Lastname like 'kulkarni' or FirstName like 'kulkarni'
and LastName like 'sujay' and ContactNumber = '9922962322' and UHID= '1234';

SELECT * FROM patients where FirstName like 'kulkarni' or Lastname like 'parag' or FirstName like 'parag'
or LastName like 'kulkarni' or ContactNumber = '' or UHID= '';

SELECT * FROM patients where FirstName like 'kulkarni' or Lastname like 'parag' or FirstName like 'parag'
or LastName like 'kulkarni' or ContactNumber = '' or UHID= '1234';

SELECT * FROM patients where FirstName like 'kulkarni' or Lastname like 'parag' or FirstName like 'parag'
or LastName like 'kulkarni' or ContactNumber = '' or UHID= '1234';
