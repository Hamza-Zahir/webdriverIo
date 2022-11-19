import allureReporter from "@wdio/allure-reporter";
import ContactUsPage from "../../pageObjects/webdriver-university/contact-us.page"
describe('webdriveruniversity - contact us page', function () {
    // this.retries(1) // retry all tests in this suite up to 1 times
    beforeEach(async () => {
        // await browser.url("/Contact-Us/contactus.html");
        await ContactUsPage.open();
        console.log(`CONFIG ENV ${browser.config.environment }`);
        console.log(`CONFIG EMAIL ${browser.config.email}`);
        console.log(`CONFIG FIRST NAME ${browser.config.firstName}`);
        console.log(`CONFIG PASSWORD ${browser.config.password}`);
        console.log(`BASE URL ${browser.config.baseUrl}`);
      
    });
    it.only('valid submission - submit all information', async function () {
        // this.retries(2) // retry all tests in this suite up to 2 times

        // ///////////////////////////////////////////////
        allureReporter.addFeature("Contact us Page - valid Submission");
        allureReporter.addDescription("Validate contact us page by submitting all data");
        allureReporter.addSeverity("critical");
        // /////////////////////////////////////////////
        /*
            const firstName = await $('//*[@name="first_name"]');
            const lastName = await $('//*[@name="last_name"]');
            const emailAddress = await $('//*[@name="email"]');
            const message = await $('//*[@name="message"]');
            const submitButton = await $('//*[@type="submit"]');

            await firstName.setValue("hamza");
            await lastName.setValue("Blogs");
            await emailAddress.setValue("hamza_blogs123@gmail.com");
            await message.setValue("helloooooooooooo");

            // await submitButton.click();
            // // or
            // await browser.waitThenClick(submitButton); // A function created in command
        
            const successfulSubmissionHeader = await $('#contact_reply > h1');
            expect(successfulSubmissionHeader).toHaveText("Thank You for your Message!")
    
            */

        // await ContactUsPage.submitForm("hamza", "Blogs", "hamza_blogs123@gmail.com", "helloooooooooooo");
        // await ContactUsPage.submitForm_UsingRandomData(browser.config.firstName, "Blogs");
        await ContactUsPage.submitForm_UsingRandomData("hamza", "Blogs");
         await expect(ContactUsPage.successfulSubmissionHeader).toHaveText("Thank You for your Message!")

        // const successfulSubmissionHeader2 = await (await $('#contact_reply > h1')).getText();
        //  expect(successfulSubmissionHeader2).toEqual("Thank You for your Message!55")


    });

    it('invalid submission - dont submit all information', async () => {
        // ///////////////////////////////////////////////
        allureReporter.addFeature("Contact us Page - invalid Submission");
        allureReporter.addDescription("Validate contact us page by not submitting all data");
        allureReporter.addSeverity("normal");
        // /////////////////////////////////////////////

        await ContactUsPage.submitForm("hamza", "Blogs", "", "helloooooooooooo")

        await expect(ContactUsPage.unsuccessfulSubmissionHeader).toHaveTextContaining(["Error: all fields are required", "Error: Invalid email address"])
        
        // await browser.pause(2000);
    });
    it('only type a first name', async () => {

        await ContactUsPage.submitForm("hamza")

        await expect(ContactUsPage.unsuccessfulSubmissionHeader).toHaveTextContaining(["Error: all fields are required", "Error: Invalid email address"])
        
        await browser.pause(2000);
    });
});