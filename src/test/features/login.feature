Feature: OrangeHRM Login Functioanlity

Scenario: Login and Logout with valid credentials
Given I am on the OrangeHRM login page
When I login with the valid credentials
And I click on the account button
And I click on the logout button
Then I route back to the login page