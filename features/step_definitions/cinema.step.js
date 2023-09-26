const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
const { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 60000,
  });
});
When("user choose day", async function () {
  await clickElement(this.page, "body > nav > a:nth-child(7)");
});
When("user choose time", async function () {
  await clickElement(
    this.page,
    "body > main > section:nth-child(2) > div:nth-child(2) > ul > li > a"
  );
});
When("user choose one place", async function () {
  await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(4)"
  );
});
When("user choose two place", async function () {
  await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(5)"
  );
});
When("user choose three place", async function () {
  await clickElement(
    this.page,
    "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(6)"
  );
});
When("user booked place", async function () {
  await clickElement(this.page, "body > main > section > button");
});
When("user check QR", async function () {
  await clickElement(this.page, "body > main > section > div > button");
});
Then("user see text {string}", async function (string) {
  const actual = await getText(
    this.page,
    "body > main > section > div > p:nth-child(7)"
  );
  const expected = await string;
  expect(actual).contains(expected);
});
Then("user see button disabled {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});
