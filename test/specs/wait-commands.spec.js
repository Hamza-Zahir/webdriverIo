describe("wait commands - examples", () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url("/Ajax-Loader/index.html");
  });
  it("pause command", async () => {
    const clickMe_Button = await $('//*[text() = "CLICK ME!"]/..');

    await browser.pause(5000);
    await clickMe_Button.click();
    await browser.pause(2000);
  });
  it("wait For Clickable", async () => {
    const clickMe_Button = await $("#button1");
    // await clickMe_Button.waitForClickable({timeout: 3000});
    await clickMe_Button.waitForClickable();
    await clickMe_Button.click();
    await browser.pause(1500);
  });
  it("wait For Displayed", async () => {
    const clickMe_Button = await $("#button1");
    await clickMe_Button.waitForDisplayed();
    await clickMe_Button.click();
    await browser.pause(1500);
  });
  it("wait For Exist", async () => {
    const clickMe_Button = await $("#button1");
    await clickMe_Button.waitForExist();
  });
  it("wait until", async () => {
    await browser.url("/Accordion/index.html");
    const loadingStatus_UI = await $("#text-appear-box");
    await loadingStatus_UI.waitUntil(async function() {
        return (await this.getText()) === "LOADING COMPLETE."
    },
    {
       timeout: 15000,
       timeoutMsg: "expected text to be different after 15 secconds",
    });
  });
});
