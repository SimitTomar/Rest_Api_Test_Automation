@smoke @regression

Feature: As an application Admin, I should be able to calculate new salary of employee

    Scenario: Remove all the employees from database

        Given I make a request to remove details of all the employees

    Scenario: Calculate new salary of one employee

        Given I have an employee with details as Kate, Kate@TestZone.com, female, engineer and 80000
        And Kate has received a performance rating of 4
        When I make a request to calculate the new salary
        Then the new salary should be 88000
        And the status should be 200
        And the response should conform to the newSalary schema

    Scenario Outline: Calculate new salary of multiple employees

        Given I have an employee with details as <Name>, <Email_Id>, <Gender>, <Title> and <Current_Salary>
        And <Name> has received a performance rating of <Performance_Rating>
        When I make a request to calculate the new salary
        Then the new salary should be <New_Salary>
        And the status should be 200
        And the response should conform to the newSalary schema

        Examples:
            | Name  | Email_Id           | Gender | Title    | Current_Salary | Performance_Rating | New_Salary |
            | John  | John@TestZone.com  | male   | engineer | 40000          | 5                  | 50000      |
            | Mary  | Mary@TestZone.com  | female | manager  | 60000          | 3                  | 69000      |
            | Peter | Peter@TestZone.com | male   | director | 85000          | 4                  | 101000     |
