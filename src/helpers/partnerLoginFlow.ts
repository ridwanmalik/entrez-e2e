import { PartnerCredentials } from "@/data/partnerData"
import { second } from "@/helpers/utils"
import PartnerLoginPage from "@/pageObjects/web/PartnerLoginPage"

export const runPartnerLoginSteps = (credentials: PartnerCredentials) => {
  describe("Step 4 — Partner Login", () => {
    it("should open the partner portal login page", async () => {
      await PartnerLoginPage.open()
      // add 30 second wait for the page to load
      // await browser.pause(second(30))
      expect(await PartnerLoginPage.isLoaded()).toBe(true)
    })

    it("should enter the email address", async () => {
      await PartnerLoginPage.enterEmail(credentials.email)
    })

    it("should enter the password", async () => {
      await PartnerLoginPage.enterPassword(credentials.password)
    })

    it("should submit and land on the dashboard", async () => {
      await PartnerLoginPage.submitLogin()
      await browser.pause(second(5)) // wait for 5 seconds to allow the dashboard to load
      expect(await PartnerLoginPage.isDashboardLoaded()).toBe(true)
    })
  })
}
