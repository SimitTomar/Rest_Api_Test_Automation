@smoke @regression

Feature: As an application Admin, I should be able to add a new employee to the records

    @test1

    Scenario: Add a new employee to the records

        Given I have a new employee with details as "Bonda", "b@c.com", "associate", "40000" and "12"
        When I make a request to add the employee
        Then the new employee should be added to the records with correct details
        And the status as "200"


    Scenario Outline: Add different employees with Title as Engineer, Manager, Director to the records
        Given I have <Name>, <Email Id>, <Title>, <Current Salary> and <Experience> for an employee
        When I make a request to add a new employee
        Then the employee should be added to the records with correct details
        And the status as "200"


        Examples:
            | Name    | Email Id      | Title    | Current Salary | Experience |
            | Bonda   | bonda@c.com   | Engineer | 40000          | 8          |
            | Manish  | m@sapient.com | Manager  | 90000          | 12         |
            | Anirudh | A@sapient.com | Director | 85000          | 14         |


    Scenario Outline: Adding employees with Invalid Title shoul return an error - "Invalid Title" with status code as 400
        Given I have <Name>, <Email Id>, <Title>, <Current Salary> and <Experience> for an employee
        When I make a request to add a new employee
        Then the API should return the <Error Message>
        And the status as "400"


        Examples:
            | Name    | Email Id      | Title             | Current Salary | Experience | Error Message|
            | Anirudh | A@sapient.com | Enginr            | 85000          | 14         | Invalid Title|
            | Bonda   | bonda@c.com   | Receptionist      | 40000          | 8          | Invalid Title|
            | Manish  | m@sapient.com | 1234              | 90000          | 12         | Invalid Title|
            | Anirudh | A@sapient.com | &*&*&*            | 85000          | 14         | Invalid Title|
            | Anirudh | A@sapient.com | Asscoiate Manager | 85000          | 14         | Invalid Title|