import { Role, validUser } from "@/data/testData"
import { runSharedRegistrationSteps } from "@/helpers/registrationFlow"
import RegistrationPage from "@/pageObjects/RegistrationPage"

describe("Service Registration", () => {
  const user = validUser(Role.Service)

  runSharedRegistrationSteps(user)

  describe("Step 4 — Bank Account", () => {
    it("should enter account number and proceed to Step 5", async () => {
      await RegistrationPage.enterAccountNumber(user.accountNumber)
      await RegistrationPage.tapNext()
    })
  })

  describe("Step 5 — Pricing per Kilometre", () => {
    it("should proceed with pre-filled pricing", async () => {
      await RegistrationPage.tapNext()
    })
  })

  describe("Step 6 — Submit", () => {
    it("should tap Create Account, see success dialog, and dismiss it", async () => {
      await RegistrationPage.tapCreateAccount()
      expect(await RegistrationPage.isDisplayed(RegistrationPage.registrationSuccessDialog, 30000)).toBe(true)
      await RegistrationPage.tap(RegistrationPage.okButton)
    })
  })
})
