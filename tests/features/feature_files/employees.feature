@smoke @regression

Feature: As an application Admin, I should be able to Create, Retrieve, Update & Delete a new application user

    @post
    Scenario: Create a new employee

        Given I have a new employee with details as "Kate", "Kate@TestZone.com", "female", "engineer" and 60000
        When I make a request to create the employee
        Then I should have a new employee created with name as "Kate"
        And the status as 201

    @get
    Scenario: Retrieve details of an employee

        Given I have a new employee with details as "Oliver", "Oliver@TestZone.com", "male", "engineer" and 60000
        When I make a request to create the employee
        And I make a request to retrieve the employee details for "Oliver"
        Then I should have an employee with details as "Oliver", "Oliver@TestZone.com", "male", "engineer" and 60000
        And the status as 200
        And the response should conform to the employees schema

    @get
    Scenario: Retrieve details of all employees with title as manager

        Given I make a request to create the following employees
            | employeeName | emailId            | gender | title    | currentSalary |
            | John         | John@TestZone.com  | male   | manager  | 78000         |
            | Mary         | Mary@TestZone.com  | female | manager  | 80000         |
            | Peter        | Peter@TestZone.com | male   | director | 100000        |

        When I make a request to create the employee
        When I make a request to retrieve the employees with title as "manager"
        Then the retrieved list of employees should match with the expected "listOfManagers"
        And the status as 200

    @put
    Scenario: Update details of an employee

        Given I have a new employee with details as "Lucy", "Lucy@TestZone.com", "female", "engineer" and 60000
        When I make a request to create the employee
        And the status as 201
        And I make a request to update the title of "Lucy" to "manager"
        Then I should have an employee with details as "Lucy", "Lucy@TestZone.com", "female", "manager" and 60000
        And the status as 200
        And the response should conform to the employees schema

    @delete
    Scenario: Delete details of an employee

        Given I have a new employee with details as "Dave", "Dave@TestZone.com", "male", "manager" and 80000
        When I make a request to create the employee
        And the status as 201
        And I make a request to delete the details of "Dave"
        Then the status as 200
        And the details for "Dave" should no longer exist