import { second } from "@/helpers/utils"
import DriverHomePage from "@/pageObjects/app/DriverHomePage"
import DriverOrderPage from "@/pageObjects/app/DriverOrderPage"

export const runDriverDeliverySteps = () => {
  describe("Step 7 — Driver Delivery", () => {
    it("should tap the order to open the order details", async () => {
      await DriverHomePage.tapOrder()
    })

    it("should land on the order details page", async () => {
      expect(await DriverOrderPage.isLoaded()).toBe(true)
    })

    it("should slide to start delivery", async () => {
      await DriverOrderPage.slideToStartDelivery()
    })

    it("should wait and then slide to finish delivery", async () => {
      await browser.pause(second(10))
      await DriverOrderPage.slideToFinishDelivery()
    })

    it("should show the Good job! Order is delivered popup", async () => {
      expect(await DriverOrderPage.isDeliverySuccessVisible()).toBe(true)
    })

    it("should tap OK to dismiss the popup", async () => {
      await DriverOrderPage.tapOk()
    })
  })
}
