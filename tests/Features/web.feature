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

    @javascript
    Scenario: A task
        Given I am on "/#tasks/6"
        Then I wait 1 second
        And I should see "This one has a date and a context AND a project!"
        And I should see "+project"
        And I should see "@context"

    @javascript
    Scenario: A completed task
        Given I am on the homepage
        Then I wait 1 second
        And the checkbox "task-7-complete" should be checked

    @javascript
    Scenario: Filter
        Given I am on the homepage
        Then I wait 1 second
        Given fill in "search" with "+winning"
        And I should see 1 ".task" elements
