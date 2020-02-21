@smoke @regression

Feature: As the application Admin, I should be able to retrieve all the information of the Users registerd on the site

Scenario: Get list of all the registered users

Given I have the access to registered users
When I fetch the User list
Then I should get all the registered users