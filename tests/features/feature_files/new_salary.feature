@smoke @regression

Feature: As an application Admin, I should be able to calculate new salary of employee

    Scenario: Calculate new salary of one employee

        Given I have an employee with details as Jude, Jude@TestZone.com, male, engineer and 80000
        And Jude has received a performance rating of 4
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
            | Name   | Email_Id            | Gender | Title    | Current_Salary | Performance_Rating | New_Salary |
            | Mark   | Mark@TestZone.com   | male   | engineer | 40000          | 5                  | 50000      |
            | Danise | Danise@TestZone.com | female | manager  | 60000          | 3                  | 69000      |
            | Donald | Donald@TestZone.com | male   | director | 85000          | 4                  | 101000     |
