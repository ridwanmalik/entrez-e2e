import { second } from "@/helpers/utils"
import CustomerDrawerPage from "@/pageObjects/app/CustomerDrawerPage"
import CustomerHomePage from "@/pageObjects/app/CustomerHomePage"
import DriverHomePage from "@/pageObjects/app/DriverHomePage"

export const runPreCleanupSteps = () => {
  describe("Step 0 — Pre-cleanup", () => {
    it("should log out if already logged in", async () => {
      const isCustomerHome = await CustomerHomePage.isDisplayed(CustomerHomePage.searchBar, second(10))
      const isDriverHome =
        !isCustomerHome && (await DriverHomePage.isDisplayed(DriverHomePage.workSchedulesHeading, second(10)))

      if (isCustomerHome || isDriverHome) {
        await CustomerHomePage.tapAccountTab()
        await CustomerDrawerPage.tapLogOut()
        // await CustomerDrawerPage.tapOk()
      }
    })
  })
}
