Feature: Add User

Scenario:  Add a new user to the system
Given I am on the OrangeHRM login page
When I login with the valid credentials
When I click on the Add User button under the Admin module
And I enter the required information
And I click on the Save button
Then I should be able to see the new user in the list of users