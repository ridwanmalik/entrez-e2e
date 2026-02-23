import { Role, validUser } from "@/data/testData"
import { runSharedRegistrationSteps } from "@/helpers/registrationFlow"
import RegistrationPage from "@/pageObjects/RegistrationPage"

describe("Client Registration", () => {
  const user = validUser(Role.Client)

  runSharedRegistrationSteps(user)

  describe("Step 4 — Card Info", () => {
    it("should proceed with pre-filled test card info", async () => {
      await RegistrationPage.tapNext()
    })
  })

  describe("Step 5 — Submit", () => {
    it("should tap Create Account, see success dialog, and dismiss it", async () => {
      await RegistrationPage.tapCreateAccount()
      expect(await RegistrationPage.isDisplayed(RegistrationPage.registrationSuccessDialog, 30000)).toBe(true)
      await RegistrationPage.tap(RegistrationPage.okButton)
    })
  })
})
