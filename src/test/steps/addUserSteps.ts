import { Given, When, Then } from '@cucumber/cucumber'
import { chromium, Browser, Page, expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

const userName = "Playwright" + Math.random();
const password = "Playwright" + Math.random();

When('I click on the Add User button under the Admin module', async function () {
    await pageFixture.page.locator('//span[normalize-space()="Admin"]').click();
    await pageFixture.page.locator('//button[normalize-space()="Add"]').click();
  });

When('I enter the required information', { timeout: 20000 }, async function () {
    await pageFixture.page.locator('(//div[normalize-space()="-- Select --"])[1]').click();
    await pageFixture.page.locator('//span[contains(text(),"Admin")]').click();

    await pageFixture.page.locator('input[placeholder="Type for hints..."]').pressSequentially("test");
    await pageFixture.page.waitForSelector('input[placeholder="Type for hints..."]')
    await expect(pageFixture.page.locator('//span[contains(text(),"Test1")]')).toBeVisible();
    await pageFixture.page.locator('//span[contains(text(),"Test1")]').click();

    await pageFixture.page.locator('(//div[@class="oxd-select-text-input"])[2]').click();
    await pageFixture.page.locator('//span[normalize-space()="Enabled"]').click();

    await pageFixture.page.locator('(//input[@class="oxd-input oxd-input--active"])[2]').fill(userName);
    await pageFixture.page.locator('(//input[@type="password"])[1]').fill(password);
    await pageFixture.page.locator('(//input[@type="password"])[2]').fill(password);
  });

When('I click on the Save button', async function () {
    await pageFixture.page.locator('button[type="submit"]').click();
  });


Then('I should be able to see the new user in the list of users', {timeout: 10000}, async function () {
  await pageFixture.page.waitForSelector('//button[normalize-space()="Add"]');

  await expect(pageFixture.page.locator(`text = ${userName}`)).toBeVisible();
    //await expect(pageFixture.page.locator(`//div[contains(text(),"${userName}")]`)).toHaveText(userName);
  });