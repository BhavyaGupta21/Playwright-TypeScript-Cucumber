
import { Given, When, Then } from '@cucumber/cucumber'
import { chromium, Browser, Page, expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

Given('I am on the OrangeHRM login page', async function () {
    await pageFixture.page.goto('https://opensource-demo.orangehrmlive.com/');
});

When('I login with the valid credentials', async function () {
    await pageFixture.page.locator('input[placeholder="Username"]').fill('Admin');
    await pageFixture.page.locator('input[placeholder="Password"]').fill('admin123');
    await pageFixture.page.locator('button[type="submit"]').click();
});

When('I click on the account button', async function () {
    await pageFixture.page.locator('.oxd-userdropdown-name').click();
           
});
        
When('I click on the logout button', async function () {
    await pageFixture.page.locator('//a[normalize-space()="Logout"]').click();
});

Then('I route back to the login page', async function () {
    await expect(pageFixture.page.locator('button[type="submit"]')).toBeVisible();
});