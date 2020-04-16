@smoke @regression

Feature: As an application Admin, I should be able to Create, Retrieve, Update & Delete a new application user

    @post
    Scenario: Create a new employee

        Given I have a new employee with details as Kate, Kate@TestZone.com, female, engineer and 60000
        When I make a request to create the employee
        Then I should have an employee with details as Kate, Kate@TestZone.com, female, engineer and 60000
        And the status as 201
        And the response should conform to the employees schema

    @post
    Scenario Outline: Create different employees with Title as Engineer, Manager, Director to the records
        Given I have a new employee with details as <Name>, <Email_Id>, <Gender>, <Title> and <Current_Salary>
        When I make a request to create the employee
        Then I should have an employee with details as <Name>, <Email_Id>, <Gender>, <Title> and <Current_Salary>
        And the status as 201
        And the response should conform to the employees schema

        Examples:
            | Name  | Email_Id           | Gender | Title    | Current_Salary |
            | John  | John@TestZone.com  | male   | engineer | 60000          |
            | Mary  | Mary@TestZone.com  | female | manager  | 80000          |
            | Peter | Peter@TestZone.com | male   | director | 100000          |

    @get
    Scenario: Retrieve details of an employee

        Given I have a new employee with details as Oliver, Oliver@TestZone.com, male, engineer and 60000
        When I make a request to create the employee
        And I make a request to retrieve the employee details for Oliver
        Then I should have an employee with details as Oliver, Oliver@TestZone.com, male, engineer and 60000
        And the status as 200
        And the response should conform to the employees schema

    @put
    Scenario: Update details of an employee

        Given I have a new employee with details as Lucy, Lucy@TestZone.com, female, engineer and 60000
        When I make a request to create the employee
        And the status as 201
        And I make a request to update the title of Lucy to manager
        Then I should have an employee with details as Lucy, Lucy@TestZone.com, female, manager and 60000
        And the status as 200
        And the response should conform to the employees schema

    @delete
    Scenario: Delete details of an employee

        Given I have a new employee with details as Dave, Dave@TestZone.com, male, manager and 80000
        When I make a request to create the employee
        And the status as 201
        And I make a request to delete the details of Dave
        Then the status as 200
        And the details for Dave should no longer exist