import CustomerHomePage from "@/pageObjects/app/CustomerHomePage"
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
  })
}
