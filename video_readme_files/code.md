

First Feature File

```
Feature: As an application Admin, I should be able to Create, Retrieve, Update & Delete a new application user

    Scenario: Create a new employee

        Given I have a new employee with details as "Kate", "Kate@TestZone.com", "female", "engineer" and 60000
        When I make a request to create the employee
        Then I should have an employee with details as "Kate", "Kate@TestZone.com", "female", "engineer" and 60000
```

settings.json

```
{
    "cucumberautocomplete.steps": [
    "tests/features/step_definitions/*.js"
    ],
    "cucumberautocomplete.strictGherkinCompletion": false
}
```