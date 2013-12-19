Feature: Web interface

    @javascript
    Scenario: Task list
        When I am on the homepage
        And I wait 1 second
        Then I should see 8 ".task" elements

    @javascript
    Scenario: Task in the task list
        When I am on the homepage
        And I wait 1 second
        Then I should see "This one has a date and a context AND a project!" in the "#task-6" element
        And I should see "+project" in the "#task-6" element
        And I should see "@context" in the "#task-6" element

    @javascript
    Scenario: A completed task
        When I am on the homepage
        And I wait 1 second
        Then the checkbox "task-7-complete" should be checked

    @javascript
    Scenario: Filter
        When I am on the homepage
        Then I wait 1 second
        When fill in "search" with "+winning"
        Then I should see 1 ".task" elements

    @javascript
    Scenario: Complete a task
        Given I am on the homepage
        And I wait 1 second
        When I check "task-6-complete"
        And I wait 4 second
        And I reload the page
        And I wait 1 second
        Then the checkbox "task-6-complete" should be checked

    @javascript
    Scenario: Rapid filter
        Given I am on the homepage
        And I wait 1 second
        When I click on the 1st ".projects a" element
        Then I should see "+winning" in the "#search" element
        And I should see 1 ".task" elements

    @javascript
    Scenario: Create a task
        Given I am on the homepage
        And I wait 1 second
        When I fill in "search" with "New task"
        And I press "create"
        Then I should see text matching "Task \d+ created"
        And I should see "New task" in the "#tasks" element
