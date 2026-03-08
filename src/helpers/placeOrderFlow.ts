import CartPage from "@/pageObjects/app/CartPage"
import CheckoutPage from "@/pageObjects/app/CheckoutPage"
import CustomerHomePage from "@/pageObjects/app/CustomerHomePage"
import DriverSelectionPage from "@/pageObjects/app/DriverSelectionPage"
import ItemDetailPage from "@/pageObjects/app/ItemDetailPage"
import RestaurantMenuPage from "@/pageObjects/app/RestaurantMenuPage"

export const runPlaceOrderSteps = () => {
  describe("Step 2 — Place Order", () => {
    it("should tap FOODS on the home screen if visible", async () => {
      await CustomerHomePage.tapFoodsIfVisible()
    })

    it("should tap the second restaurant in the list", async () => {
      await CustomerHomePage.tapRestaurant(1)
    })

    it("should land on the restaurant menu page", async () => {
      expect(await RestaurantMenuPage.isLoaded()).toBe(true)
    })

    it("should tap Pizza", async () => {
      await RestaurantMenuPage.tapPizza()
    })

    it("should land on the item detail page", async () => {
      expect(await ItemDetailPage.isLoaded()).toBe(true)
    })

    it("should select the first variation", async () => {
      await ItemDetailPage.selectFirstVariation()
    })

    it("should select coke as the drink", async () => {
      await ItemDetailPage.selectCoke()
    })

    it("should tap Add to Cart", async () => {
      await ItemDetailPage.tapAddToCart()
    })

    it("should tap the cart button to see order details", async () => {
      await RestaurantMenuPage.tapCartButton()
    })

    it("should land on the cart page", async () => {
      expect(await CartPage.isLoaded()).toBe(true)
    })

    it("should tap Continue", async () => {
      await CartPage.tapContinue()
    })

    it("should land on the driver selection page", async () => {
      expect(await DriverSelectionPage.isLoaded()).toBe(true)
    })

    it("should select the specific driver", async () => {
      await DriverSelectionPage.selectDriver()
    })

    it("should confirm the driver selection", async () => {
      await DriverSelectionPage.tapConfirm()
    })

    it("should land on the checkout page", async () => {
      expect(await CheckoutPage.isLoaded()).toBe(true)
    })

    it("should tap Place Order", async () => {
      await CheckoutPage.tapPlaceOrder()
    })

    it("should dismiss the order created successfully popup", async () => {
      await CheckoutPage.tapOk()
    })
  })
}
