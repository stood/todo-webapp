Feature: Web interface

    @javascript
    Scenario: Task list
        Given I am on the homepage
        Then I wait 1 second
        And I should see 8 ".task" elements
