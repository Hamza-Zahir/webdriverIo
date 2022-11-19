import HomePage from "../../pageObjects/automation-test-store/home.page"
import SkinCarePage from "../../pageObjects/automation-test-store/skinCare.page"

describe("add items to basket", () => {
    it(`add speciic 'skincare products' to basket & validate cart total`, async () => {
        //    await browser.url("https://automationteststore.com/");
        await HomePage.open();

        // const skincareLinks = await $$('//a[contains(text(),"Skincare")]');
        // await skincareLinks[1].click();
        await HomePage.categoryMenuComponent.categoryMenuLink("Skincare")[1].click();

        await SkinCarePage.addSpecificItem_ValidateTotal("creme precieuse nuit 50ml", "total moisture facial cream");


        /*  
            // // const skincareProducts_heder_Links = await $$(".fixed_wrapper .prdocutname");
            const skincareProducts_heder_Links = await SkinCarePage.itemComponent.itemHeaderLinks;
        
             const itemPrices = [];
 
            for (const header of skincareProducts_heder_Links) {
                const tempHeaderText = await header.getText();
    
                if (
                    tempHeaderText.toLocaleLowerCase() == "creme precieuse nuit 50ml" ||
                    tempHeaderText.toLocaleLowerCase() == "total moisture facial cream"
                ) {
                    const attr = await header.getAttribute("href");
                    // // attr1 ====  https://automationteststore.com/index.php?rt=product/product&path=43&product_id=66
                    // // attr2 ====  https://automationteststore.com/index.php?rt=product/product&path=43&product_id=93
                    const itemId = attr.split("product_id=").pop();
                    await (await $(`//a[@data-id="${itemId}"]`)).click();
                    itemPrices.push(
                        Number((await $(
                            `//a[@data-id="${itemId}"]/following-sibling::div/div[@class="pricenew"] | //a[@data-id="${itemId}"]/following-sibling::div/div[@class="oneprice"]`
                        ).getText()).replace("$", ""))
                    );
                }
            }
            var totalItemsPrices = itemPrices.reduce((acc, price) => acc + price, 0)
            await $('//span[text()="Cart"]').click();
            expect(browser).toHaveUrlContaining("checkout");
            var tempShippingRate = await $(`//span[text()="Flat Shipping Rate:"]/../following-sibling::td`).getText()
            var shippingRate = tempShippingRate.replace("$", "");
            totalItemsPrices = totalItemsPrices + Number(shippingRate)
            console.log("totalPrices  ======>>>>> ", totalItemsPrices) //258 + 2 = 260
    
            var cartTotal = await $(`//span[text()="Total:"]/../following-sibling::td`).getText()
    
            cartTotal = Number(cartTotal.replace("$", ""))
    
            expect(totalItemsPrices).toEqual(cartTotal);
    
    
            await browser.pause(3000);
         */
    });
});
