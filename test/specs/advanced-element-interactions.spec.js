describe("advanced elemnt interaction - examples", () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
    });
    it("inputs", async () => {
        await browser.url("/Contact-Us/contactus.html");
        const firstNameTestFild = await $('//*[@name="first_name"]');

        await firstNameTestFild.addValue("add your text here ");
        await firstNameTestFild.addValue("my added text ");
        await browser.pause(2000);

        await firstNameTestFild.setValue("heloooooooooooooooo");
        await browser.pause(2000);

        await firstNameTestFild.clearValue();
        await browser.pause(2000);
    });
    it("dropdown", async () => {
        await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");
        const programmingLanguage_DropdownList = await $("#dropdowm-menu-1");
        await programmingLanguage_DropdownList.selectByAttribute("value", "python");
        expect(programmingLanguage_DropdownList).toHaveValueContaining("python");
        await browser.pause(2000);

        const tech_DropdownList = await $("#dropdowm-menu-2");
        await tech_DropdownList.selectByIndex(2);
        expect(tech_DropdownList).toHaveValueContaining("testNG", {
            ignoreCase: true,
        });
        await browser.pause(2000);

        const frontendLanguage_DropdownList = await $("#dropdowm-menu-3");
        await frontendLanguage_DropdownList.selectByIndex(2);
        expect(frontendLanguage_DropdownList).toHaveValueContaining("javascript", {
            ignoreCase: true,
        });
        await browser.pause(2000);
    });
    it("state commands", async () => {
        await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");
        const pumpkinRadioButtont = await $('[value="pumpkin"]');
        const pumpkinRadioButtont_isDisplayed =
            await pumpkinRadioButtont.isDisplayed();
        expect(pumpkinRadioButtont_isDisplayed).toEqual(true);
        expect(pumpkinRadioButtont_isDisplayed).toBeEnabled();

        const pumpkinRadioButtont_isClickable =
            await pumpkinRadioButtont.isClickable();
        expect(pumpkinRadioButtont_isClickable).toEqual(true);

        const cabbageRadioButtont = await $('[value="cabbage"]');
        const cabbageRadioButtont_isEnabled = await cabbageRadioButtont.isEnabled();
        expect(cabbageRadioButtont_isEnabled).toEqual(false);
    });

    it("state commands", async () => {
        await browser.url("/Actions/index.html");

        // drag & drop
        const elem = await $("#draggable");
        const target = await $("#droppable");
        await elem.dragAndDrop(target);
        await browser.pause(2000);

        // double click
        const doubleClick_Button = await $("#double-click");
        await doubleClick_Button.doubleClick();
        await browser.pause(2000);

        // mouse hover
        await (await $('//button[text()="Hover Over Me First!"]')).moveTo();
        const firstLink = await $('(//a[text()="Link 1"])[1]');
        await firstLink.waitForClickable();
        await firstLink.click();
        await browser.pause(2000);
    });
    it("handling windows", async () => {
        await browser.url("/");
        await browser.newWindow("https://automationteststore.com/");

        let currentWindow_Title = await browser.getTitle();
        expect(browser).toHaveUrlContaining("automationteststore");
        console.log(`current Window Title ===>>> ${currentWindow_Title}`);
        await browser.pause(2000);

        await browser.switchWindow("webdriveruniversity.com/");
        expect(browser).toHaveUrlContaining("webdriveruniversity");
        await browser.pause(2000);

        await (await $("#contact-us")).click();
        await browser.switchWindow("automationteststore");
        await browser.closeWindow();

        await browser.switchWindow("contactus");
        await browser.closeWindow();

        await browser.switchWindow("webdriveruni");
        console.log(`current Window Title ===>>> ${await browser.getTitle()}`);
        await browser.pause(3000);
    });
    it("IFrames", async () => {
        await browser.url("/IFrame/index.html");

        const iframe = await $("#frame");
        await browser.switchToFrame(iframe);
        await browser.pause(2000);
        await (await $('//a[text()="Our Products"]')).click();
        await browser.switchToParentFrame();
        await browser.pause(2000);
    });

    it("Alerts", async () => {
        await browser.url("/Popup-Alerts/index.html");
        await (await $("#button1")).click();
        // await browser.pause(2000);
        await browser.acceptAlert();
        // await browser.pause(2000);
        await (await $("#button4")).click();
        const alertText = await browser.getAlertText();
        expect(alertText).toEqual("Press a button!");

        await browser.acceptAlert();
        await expect($("#confirm-alert-text")).toHaveText("You pressed OK!");

        await (await $("#button4")).click();
        await browser.dismissAlert();
        await expect($("#confirm-alert-text")).toHaveText("You pressed Cancel!");
        await browser.pause(2000);
    });
    it("File Upload", async () => {
        await browser.url("/File-Upload/index.html");
        await (
            await $("#myFile")
        ).addValue(`${process.cwd()}\\data\\dummy_file.txt`);
        await browser.pause(1000);
        await (await $("#submit-button")).click();
        await browser.pause(2000);
        const alertText = await browser.getAlertText();
        expect(alertText).toEqual("Your file has now been uploaded!");
    });
    it("js Execute", async () => {
        await browser.url("/Hidden-Elements/index.html");
        await browser.execute(() => {
            return document.getElementById("not-displayed").setAttribute("id", "");
        })
        await browser.execute(() => {
            return document.body.style.backgroundColor = "tomato";
        })
        await browser.pause(2000);
        
    });
});
