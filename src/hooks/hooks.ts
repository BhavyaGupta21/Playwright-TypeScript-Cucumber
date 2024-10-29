import { After, AfterAll, Before, BeforeAll, AfterStep, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium} from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async function() {
    browser = await chromium.launch({headless: false});
})

Before(async function() {
    context = await browser.newContext();
    page = await browser.newPage();
    pageFixture.page = page;
})

After(async function({pickle, result}) { // pickle gives function where it runs the scenario
    // Screenshot only for failure
    if(result?.status == Status.FAILED) {
        const image = await pageFixture.page.screenshot({path:`./test-result/Screenshots/${pickle.name}.png`, type:'png'})
        await this.attach(image, "image/png");
    }

    // Screenshot after each scenario
    // const image = await pageFixture.page.screenshot({path:`./test-result/Screenshots/${pickle.name}.png`, type:'png'})
    // await this.attach(image, "image/png");

    await page.close();
    await context.close();
})

AfterStep(async function({pickle}) {
    // Screenshot after each scenario
    // const image = await pageFixture.page.screenshot({path:`./test-result/Screenshots/${pickle.name}.png`, type:'png'})
    // await this.attach(image, "image/png");
})

AfterAll (async function() {
    await browser.close();
})