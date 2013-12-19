Feature: Web interface
    Background:
        Given I am on the homepage
        And I wait 1 second

    @javascript
    Scenario: Task list
        Then I should see 8 ".task" elements

    @javascript
    Scenario: Task in the task list
        Then I should see "This one has a date and a context AND a project!" in the "#task-6" element
        And I should see "+project" in the "#task-6" element
        And I should see "@context" in the "#task-6" element

    @javascript
    Scenario: A completed task
        Then the checkbox "task-7-complete" should be checked

    @javascript
    Scenario: Filter
        When fill in "search" with "+winning"
        Then I should see 1 ".task" elements

    @javascript
    Scenario: Complete a task
        When I check "task-6-complete"
        And I reload the page
        Then the checkbox "task-6-complete" should be checked
        And I should see text matching "Task \d+ updated"

    @javascript
    Scenario: Rapid filter
        When I click on the 1st ".projects a" element
        Then I should see "+winning" in the "#search" element
        And I should see 1 ".task" elements

    @javascript
    Scenario: Create a task
        When I fill in "search" with "New task"
        And I press "create"
        Then I should see text matching "Task \d+ created"
        And I should see "New task" in the "#tasks" element
