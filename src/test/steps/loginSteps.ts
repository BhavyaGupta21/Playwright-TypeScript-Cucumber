
import { Given, When, Then } from '@cucumber/cucumber'
import { chromium, Browser, Page, expect } from '@playwright/test';

let browser:Browser;
let page:Page;

Given('I am on the OrangeHRM login page', async function () {
    browser = await chromium.launch({headless:false});
    page = await browser.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/');
});

When('I login with the valid credentials', async function () {
    await page.locator('input[placeholder="Username"]').fill('Admin');
    await page.locator('input[placeholder="Password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();
});

When('I click on the account button', async function () {
    await page.locator('.oxd-userdropdown-name').click();
           
});
        
When('I click on the logout button', async function () {
    await page.locator('//a[normalize-space()="Logout"]').click();
});

Then('I route back to the login page', async function () {
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    await browser.close();
});