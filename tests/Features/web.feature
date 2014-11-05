Feature: Web interface
    Background:
        Given I am on the homepage
        And I fill in "username" with "foo"
        And I fill in "password" with "bar"
        And I check "custom-server"
        And I fill in "server" with "http://localhost:8080"
        And I press "login"

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
        Then the checkbox "task-6-complete" should be checked
        And I should see text matching "Task \d+ updated"

    @javascript
    Scenario: Rapid filter
        When I click on the 1st ".projects a" element
        Then I should see 1 ".task" elements

    @javascript
    Scenario: Create a task
        When I fill in "search" with "New task"
        And I press "create"
        Then I should see text matching "Task \d+ created"
        And I should see "New task" in the "#tasks" element

    @javascript
    Scenario: Display task detail
        When I click on the 8th ".show-detail" element
        Then I should see "Completed"
        And I should see "2012-04-03"
