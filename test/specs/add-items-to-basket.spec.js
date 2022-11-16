describe("add items to basket", () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
        await browser.url("https://automationteststore.com/");
    });
    it(`add speciic 'skincare products' to basket & validate cart total`, async () => {
        const skincareLinks = await $$('//a[contains(text(),"Skincare")]');
        await skincareLinks[1].click();

        const skincareProducts_heder_Links = await $$(
            ".fixed_wrapper .prdocutname"
        );
        const itemPrices = [];
        for (const header of skincareProducts_heder_Links) {
            const tempHeaderText = await header.getText();

            if (
                tempHeaderText.toLocaleLowerCase() == "creme precieuse nuit 50ml" ||
                tempHeaderText.toLocaleLowerCase() == "total moisture facial cream"
            ) {
                const attr = await header.getAttribute("href");
                //attr1 ====  https://automationteststore.com/index.php?rt=product/product&path=43&product_id=66
                //attr2 ====  https://automationteststore.com/index.php?rt=product/product&path=43&product_id=93
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
    });
});
