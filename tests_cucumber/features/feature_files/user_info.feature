@smoke @regression

Feature: As the application Admin, I should be able to retrieve all the information of the Users registerd on the site

@test1
Scenario: Get list of all the registered users 1

Given I have the access to registered users
When I fetch the User list
And I should get all the registered users