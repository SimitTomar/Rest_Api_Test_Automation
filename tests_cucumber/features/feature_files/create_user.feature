@smoke @regression

Feature: As an application Admin, I should be able to create a new application user

    Scenario: Add a new employee to the records

        Given I have a new employee with details as Bonda, b@c.com, female, Associate, 40000 and 12
        When I make a request to add the employee
        Then I should have an employee with details as Bonda, b@c.com, female, Associate, 40000 and 12
        And the status as 200

    Scenario Outline: Add different employees with Title as Engineer, Manager, Director to the records
        Given I have a new employee with details as <Name>, <Email_Id>, <Gender>, <Title>, <Current_Salary> and <Experience>
        When I make a request to add the employee
        Then I should have an employee with details as <Name>, <Email_Id>, <Gender>, <Title>, <Current_Salary> and <Experience>
        And the status as 200

        Examples:
            | Name    | Email_Id      | Gender | Title    | Current_Salary | Experience |
            | Bonda   | bonda@c.com   | female | Engineer | 40000          | 8          |
            | Manish  | m@sapient.com | male   | Manager  | 90000          | 12         |
            | Anirudh | A@sapient.com | male   | Director | 85000          | 14         |

    Scenario: Get details of an employee

        Given I have a new employee with details as Bonda, b@c.com, female, Associate, 40000 and 12
        When I make a request to add the employee
        And I make a request to get the employee details
        Then I should have an employee with details as Bonda, b@c.com, female, Associate, 40000 and 12
        And the status as 200

    Scenario: Update details of an employee

        Given I have a new employee with details as Bonda, b@c.com, female, Associate, 40000 and 12
        When I make a request to add the employee
        And the status as 200
        And I make a request to update the title to Manager
        Then I should have an employee with details as Bonda, b@c.com, female, Manager, 40000 and 12
        And the status as 200

    Scenario: Delete details of an employee

        Given I have a new employee with details as Bonda, b@c.com, female, Associate, 40000 and 12
        When I make a request to add the employee
        And the status as 200
        And I make a request to delete the employee details
        Then the status as 200
        And the employee should no longer exist