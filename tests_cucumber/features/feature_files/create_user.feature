@smoke @regression

Feature: As an application Admin, I should be able to create a new application user

@test1
Scenario: Create a new application user

Given I have the required details to create a new application user
When I make a request for user creation
Then I should be able to create a new user