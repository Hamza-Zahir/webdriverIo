module.exports = {
    waitThenClick: async function (element){
        console.log(`............................ ${JSON.stringify(element)}`)
        await element.waitForExist();
        await element.waitForDisplayed();
        await element.click();

    }
}