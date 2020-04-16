

First Feature File

```

Feature: As an application Admin, I should be able to create, retrieve, update and delete a user from the records

    Scenario: Add a new employee to the records

        Given I have a new employee with details as Kate, Kate@TestZone.com, female, engineer and 60000
        When I make a request to add the employee
        Then I should have an employee with details as Kate, Kate@TestZone.com, female, engineer and 60000
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