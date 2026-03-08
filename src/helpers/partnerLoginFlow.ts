import { PartnerCredentials } from "@/data/partnerData"
import PartnerLoginPage from "@/pageObjects/web/PartnerLoginPage"

export const runPartnerLoginSteps = (credentials: PartnerCredentials) => {
  describe("Step 4 — Partner Login", () => {
    it("should open the partner portal login page", async () => {
      await PartnerLoginPage.open()
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
      expect(await PartnerLoginPage.isDashboardLoaded()).toBe(true)
    })
  })
}
