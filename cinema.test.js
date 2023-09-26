const { clickElement, getText } = require("./lib/commands.js");
const puppeteer = require("puppeteer");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Let`s go to the cinema", () => {
  test("To book one place", async () => {
    await clickElement(page, "body > nav > a:nth-child(7)");
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div:nth-child(2) > ul > li > a"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(4)"
    );
    await clickElement(page, "body > main > section > button");
    await clickElement(page, "body > main > section > div > button");
    const actual = await getText(
      page,
      "body > main > section > div > p:nth-child(7)"
    );
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
    await page.screenshot({ path: "Screenshot/OnePlace.png" });
  });

  test("To book select place", async () => {
    await clickElement(page, "body > nav > a:nth-child(7)");
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div:nth-child(2) > ul > li > a"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(5)"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(6)"
    );
    await clickElement(page, "body > main > section > button");
    await clickElement(page, "body > main > section > div > button");
    const actual = await getText(
      page,
      "body > main > section > div > p:nth-child(7)"
    );
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
    await page.screenshot({ path: "Screenshot/SelectPlace.png" });
  });

  test("It is not possible to book", async () => {
    await clickElement(page, "body > nav > a:nth-child(7)");
    await clickElement(
      page,
      "body > main > section:nth-child(2) > div:nth-child(2) > ul > li > a"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(2) > span:nth-child(4)"
    );
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
    await page.screenshot({ path: "Screenshot/NotPossible.png" });
  });
});
