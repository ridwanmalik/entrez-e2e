import { DriverCredentials } from "@/data/driverData"
import DriverHomePage from "@/pageObjects/app/DriverHomePage"
import LoginPage from "@/pageObjects/app/LoginPage"
import WelcomePage from "@/pageObjects/WelcomePage"

export const runDriverLoginSteps = (credentials: DriverCredentials) => {
  describe("Step 6 — Driver Login", () => {
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

    it("should tap LOGIN and land on the driver home screen", async () => {
      await LoginPage.tapLogin()
      await DriverHomePage.tapGoOnlineIfPrompted()
      expect(await DriverHomePage.isLoaded()).toBe(true)
    })
  })
}
