describe('webdriveruniversity - contact us page', () => {
   beforeEach(async () => {
      await browser.maximizeWindow();
      await browser.url("/Contact-Us/contactus.html");

   });
    it('valid submission - submit all information', async () => {
        const firstName = await $('//*[@name="first_name"]');
        const lastName = await $('//*[@name="last_name"]');
        const emailAddress = await $('//*[@name="email"]');
        const message = await $('//*[@name="message"]');
        const submitButton = await $('//*[@type="submit"]');
        
        await firstName.setValue("hamza");
        await lastName.setValue("Blogs");
        await emailAddress.setValue("hamza_blogs123@gmail.com");
        await message.setValue("helloooooooooooo");
        await submitButton.click();
        const successfulSubmissionHeader = await $('#contact_reply > h1');
        await expect(successfulSubmissionHeader).toHaveText("Thank You for your Message!")

        // const successfulSubmissionHeader2 = await (await $('#contact_reply > h1')).getText();
        //  expect(successfulSubmissionHeader2).toEqual("Thank You for your Message!55")


    });

    it('invalid submission - dont submit all information', async () => {
        const firstName = await $('//*[@name="first_name"]');
        const lastName = await $('//*[@name="last_name"]');
        const message = await $('//*[@name="message"]');
        const submitButton = await $('//*[@type="submit"]');
        

        await firstName.setValue("hamza");
        await lastName.setValue("Blogs");
        await message.setValue("helllooooooooooooooooooooo?");
        await submitButton.click();
        const successfulSubmissionHeader = await $('body');
        await expect(successfulSubmissionHeader).toHaveTextContaining(["Error: all fields are required","Error: Invalid email address"])
        await browser.pause(4000);
    });
});