@smoke @regression

Feature: As an application Admin, I should be able to calculate new salary of employee

    Scenario: Calculate new salary of one employee

        Given sonia has received a performance rating of 4
        When I make a request to calculate the new salary
        Then the new salary should be 92000
        And the status should be 200
        And the response should conform to the newSalary schema

    # Scenario Outline: Calculate new salary of multiple employees

    #     Given <Name> has received a performance rating of <Performance_Rating>
    #     When I make a request to calculate the new salary
    #     Then the new salary should be <New_Salary>
    #     And the status should be 200
    #     And the response should conform to the newSalary schema

    #     Examples:
    #         | Name  | Performance_Rating | New_Salary |
    #         | John  | 5                  | 50000      |
    #         | Mary  | 3                  | 69000      |
    #         | Peter | 4                  | 101000     |