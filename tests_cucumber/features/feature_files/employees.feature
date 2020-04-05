@smoke @regression

Feature: As an application Admin, I should be able to create a new application user

    Scenario: Remove all the employees from database

        Given I make a request to remove details of all the employees

    Scenario: Add a new employee to the records

        Given I have a new employee with details as Kate, Kate@TestZone.com, female, engineer and 50000
        When I make a request to add the employee
        Then I should have an employee with details as Kate, Kate@TestZone.com, female, engineer and 50000
        And the status as 201
        And the response should conform to the employees schema

    Scenario Outline: Add different employees with Title as Engineer, Manager, Director to the records
        Given I have a new employee with details as <Name>, <Email_Id>, <Gender>, <Title> and <Current_Salary>
        When I make a request to add the employee
        Then I should have an employee with details as <Name>, <Email_Id>, <Gender>, <Title> and <Current_Salary>
        And the status as 201
        And the response should conform to the employees schema

        Examples:
            | Name  | Email_Id           | Gender | Title    | Current_Salary |
            | John  | John@TestZone.com  | male   | engineer | 40000          |
            | Mary  | Mary@TestZone.com  | female | manager  | 60000          |
            | Peter | Peter@TestZone.com | male   | director | 85000          |

    Scenario: Get details of an employee

        Given I have a new employee with details as Oliver, Oliver@TestZone.com, male, engineer and 48000
        When I make a request to add the employee
        And I make a request to get the employee details for Oliver
        Then I should have an employee with details as Oliver, Oliver@TestZone.com, male, engineer and 48000
        And the status as 200
        And the response should conform to the employees schema

    Scenario: Update details of an employee

        Given I have a new employee with details as Lucy, Lucy@TestZone.com, female, engineer and 50000
        When I make a request to add the employee
        And the status as 201
        And I make a request to update the title of Lucy to manager
        Then I should have an employee with details as Lucy, Lucy@TestZone.com, female, manager and 50000
        And the status as 200
        And the response should conform to the employees schema

    Scenario: Delete details of an employee

        Given I have a new employee with details as Dave, Dave@TestZone.com, male, manager and 66000
        When I make a request to add the employee
        And the status as 201
        And I make a request to delete the details of Dave
        Then the status as 200
        And the details for Dave should no longer exist