describe("locating elements", () => {
  beforeEach(async () => {
    await browser.url("https://selectors.webdriveruniversity.com/");

  });

  it("$ - locate element", async () => {
    await (await browser.$('//a[@href="#portfolio"]')).click();
    browser.pause(3000);
    const webdriverioButtom = await $('[data-target="#portfolioModal1"]');
    await webdriverioButtom.click();
    browser.pause(3000);
  });
  it("$$ - locate elements", async () => {

    const expectedTitles = ["#", "First", "Last", "Handle", "1", "2", "3", "Firstname", "Lastname", "Age"]
    const actualTitles = [];
    const tabelHeaderTitles = await $$("//table//th");

    for (const title of tabelHeaderTitles) {
    actualTitles.push(await title.getText())
    }
    expect(expectedTitles).toEqual(actualTitles)
  });
});
