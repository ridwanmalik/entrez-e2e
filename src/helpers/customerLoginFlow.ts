import { CustomerCredentials } from "@/data/customerData"
import CustomerHomePage from "@/pageObjects/app/CustomerHomePage"
import LoginPage from "@/pageObjects/app/LoginPage"
import WelcomePage from "@/pageObjects/WelcomePage"

export const runCustomerLoginSteps = (credentials: CustomerCredentials) => {
  describe("Step 1 — Customer Login", () => {
    it("should display the Welcome page on app launch", async () => {
      expect(await WelcomePage.isLoaded()).toBe(true)
    })

    it("should navigate to Login when Login is tapped", async () => {
      await WelcomePage.tapLogin()
      expect(await LoginPage.isLoaded()).toBe(true)
    })

    it("should enter phone number", async () => {
      await LoginPage.enterPhone(credentials.phone)
    })

    it("should enter password", async () => {
      await LoginPage.enterPassword(credentials.password)
    })

    it("should tap LOGIN and land on the home screen", async () => {
      await LoginPage.tapLogin()
      expect(await CustomerHomePage.isLoaded()).toBe(true)
    })
  })
}
