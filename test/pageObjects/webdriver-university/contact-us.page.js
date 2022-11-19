import BasePage from "./base.page";
import dataGenerator from "../../../utils/data-generator";


class ContactUsPage extends BasePage {
    open() {
        return super.open("Contact-Us/contactus.html");
    }
    get firstName() {
        return $('//*[@name="first_name"]');
    }
    get lastName() {
        return $('//*[@name="last_name"]');
    }
    get emailAddress() {
        return $('//*[@name="email"]');
    }
    get message() {
        return $('//*[@name="message"]');
    }
    get submitButton() {
        return $('//*[@type="submit"]');
    } 
     get successfulSubmissionHeader() {
        return $('#contact_reply > h1');
    }
    get unsuccessfulSubmissionHeader() {
        return $('body');
    }

    async submitForm(firstName, lastName, emailAddress, message) {
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.emailAddress.setValue(emailAddress);
        await this.message.setValue(message);
        await browser.waitThenClick(this.submitButton); // A function created in command
    }
    async submitForm_UsingRandomData(firstName, lastName) {
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.emailAddress.setValue(`AutoEmail_${dataGenerator.generateRandomString()}@gmail.com`);
        await this.message.setValue(`Random message ${dataGenerator.generateRandomString()}`);
       browser.pause(4000)
        await browser.waitThenClick(this.submitButton); // A function created in command
    }
  
}
export default new ContactUsPage();