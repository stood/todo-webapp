Feature: Task list

    Scenario: Index
        Given I am on the homepage
        Then the response should be in JSON
        And the JSON should be equal to:
        """
        {
            "_links": {
                "self": {
                    "href": "/"
                }
            },
            "tasks": [
                {
                    "id": 0,
                    "contexts": [],
                    "projects": [],
                    "priority": "A",
                    "complete": false,
                    "description": "Crack the Da Vinci Code.",
                    "_link": {
                        "self": { "href": "/task/0" }
                    }
                },
                {
                    "id": 1,
                    "contexts": [],
                    "projects": ["winning"],
                    "priority": "B",
                    "complete": false,
                    "description": "+winning Win.",
                    "_link": {
                        "self": { "href": "/task/1" }
                    }
                },
                {
                    "id": 2,
                    "contexts": ["context"],
                    "projects": [],
                    "complete": false,
                    "description": "@context Give it some context.",
                    "_link": {
                        "self": { "href": "/task/2" }
                    }
                },
                {
                    "id": 3,
                    "contexts": [],
                    "projects": [],
                    "complete": false,
                    "description": "Just a POD: Plain old task.",
                    "_link": {
                        "self": { "href": "/task/3" }
                    }
                },
                {
                    "id": 4,
                    "contexts": ["context"],
                    "projects": ["project"],
                    "priority": "C",
                    "complete": false,
                    "description": "+project @context This one has it all!",
                    "_link": {
                        "self": { "href": "/task/4" }
                    }
                },
                {
                    "id": 5,
                    "created": "2012-02-03",
                    "contexts": [],
                    "projects": [],
                    "priority": "C",
                    "complete": false,
                    "description": "This one has a date!",
                    "_link": {
                        "self": { "href": "/task/5" }
                    }
                },
                {
                    "id": 6,
                    "created": "2012-03-04",
                    "contexts": ["context"],
                    "projects": ["project"],
                    "priority": "B",
                    "complete": false,
                    "description": "+project @context This one has a date and a context AND a project!",
                    "_link": {
                        "self": { "href": "/task/6" }
                    }
                },
                {
                    "id": 7,
                    "contexts": [],
                    "projects": [],
                    "complete": true,
                    "completed": "2012-04-03",
                    "description": "This one has no priority and a date.",
                    "_link": {
                        "self": { "href": "/task/7" }
                    }
                }
            ]
        }
        """
