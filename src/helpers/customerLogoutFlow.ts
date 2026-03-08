import CustomerDrawerPage from "@/pageObjects/app/CustomerDrawerPage"
import CustomerHomePage from "@/pageObjects/app/CustomerHomePage"
import WelcomePage from "@/pageObjects/WelcomePage"

export const runCustomerLogoutSteps = () => {
  describe("Step 3 — Customer Logout", () => {
    it("should tap the account tab to open the drawer", async () => {
      await CustomerHomePage.tapAccountTab()
    })

    it("should see the drawer with the Log Out button", async () => {
      expect(await CustomerDrawerPage.isLoaded()).toBe(true)
    })

    it("should tap Log Out", async () => {
      await CustomerDrawerPage.tapLogOut()
    })

    it("should land back on the Welcome page", async () => {
      expect(await WelcomePage.isLoaded()).toBe(true)
    })
  })
}
