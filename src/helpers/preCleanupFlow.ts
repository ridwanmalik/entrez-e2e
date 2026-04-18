import CustomerDrawerPage from "@/pageObjects/app/CustomerDrawerPage"
import CustomerHomePage from "@/pageObjects/app/CustomerHomePage"
import DriverHomePage from "@/pageObjects/app/DriverHomePage"
import { second } from "@/helpers/utils"

export const runPreCleanupSteps = () => {
  describe("Step 0 — Pre-cleanup", () => {
    it("should log out if already logged in", async () => {
      const isCustomerHome = await CustomerHomePage.isDisplayed(CustomerHomePage.searchBar, second(5))
      const isDriverHome = !isCustomerHome && await DriverHomePage.isDisplayed(DriverHomePage.workSchedulesHeading, second(5))

      if (isCustomerHome || isDriverHome) {
        await CustomerHomePage.tapAccountTab()
        await CustomerDrawerPage.tapLogOut()
      }
    })
  })
}
