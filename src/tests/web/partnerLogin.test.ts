import { qaPartner } from "@/data/partnerData"
import { second } from "@/helpers/utils"
import PartnerLoginPage from "@/pageObjects/web/PartnerLoginPage"

describe("Partner Portal — Partner Login", () => {
  const credentials = qaPartner

  before(async () => {
    await PartnerLoginPage.open()
  })

  after(async () => {
    await browser.pause(second(10))
  })

  it("should load the login page", async () => {
    expect(await PartnerLoginPage.isLoaded()).toBe(true)
  })

  it("should enter the email address", async () => {
    await PartnerLoginPage.enterEmail(credentials.email)
  })

  it("should enter the password", async () => {
    await PartnerLoginPage.enterPassword(credentials.password)
  })

  it("should submit and redirect to the dashboard", async () => {
    await PartnerLoginPage.submitLogin()
    expect(await PartnerLoginPage.isDashboardLoaded(second(10))).toBe(true)
  })

  it("should display the partner name in the header", async () => {
    expect(await PartnerLoginPage.getLoggedInName()).toBe(credentials.name)
  })
})
