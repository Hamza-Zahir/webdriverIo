import BasePage from "./base.page";
import ItemComponent from "./components/item.comp";
import HeaderNavComponent from "./components/header-nav.comp";
import CartPage from "./cart.page";

class SkinCarePage extends BasePage {
    get itemComponent() {
        return ItemComponent
    }
    async addSpecificItem_ValidateTotal(item1, item2) {
        const skincareProducts_heder_Links = await ItemComponent.itemHeaderLinks;

        const itemPrices = [];

        for (const header of skincareProducts_heder_Links) {
            const tempHeaderText = await header.getText();

            if (
                tempHeaderText.toLocaleLowerCase() == item1 ||
                tempHeaderText.toLocaleLowerCase() == item2
            ) {
                const attr = await header.getAttribute("href");

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
        
        // await $('//span[text()="Cart"]').click();
        await HeaderNavComponent.cartLink.click()
        expect(browser).toHaveUrlContaining("checkout");
       
       
        var tempShippingRate = await CartPage.shippingRate.getText();

        var shippingRate = tempShippingRate.replace("$", "");
        totalItemsPrices = totalItemsPrices + Number(shippingRate)
        console.log("totalPrices  ======>>>>> ", totalItemsPrices) //258 + 2 = 260

        var cartTotal = await CartPage.total.getText()

        cartTotal = Number(cartTotal.replace("$", ""))

        expect(totalItemsPrices).toEqual(cartTotal);


        await browser.pause(3000);
    }
}
export default new SkinCarePage(); 