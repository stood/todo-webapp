Feature: Web interface

    @javascript
    Scenario: Task list
        Given I am on the homepage
        Then I wait 1 second
        And I should see 8 ".task" elements

    @javascript
    Scenario: Task in the task list
        Given I am on the homepage
        Then I wait 1 second
        And I should see "This one has a date and a context AND a project!" in the "#task-6" element
        And I should see "+project" in the "#task-6" element
        And I should see "@context" in the "#task-6" element
