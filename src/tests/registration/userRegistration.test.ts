import { validUser } from "@/data/testData"
import RegistrationPage from "@/pageObjects/RegistrationPage"
import WelcomePage from "@/pageObjects/WelcomePage"

describe("User Registration", () => {
  const user = validUser()

  describe("Step 1 — Personal Details", () => {
    it("should display the Welcome page on app launch", async () => {
      expect(await WelcomePage.isLoaded()).toBe(true)
    })

    it("should navigate to Registration when Create Account is tapped", async () => {
      await WelcomePage.tapCreateAccount()
      expect(await RegistrationPage.isLoaded()).toBe(true)
    })

    it("should select a role, fill all fields, and proceed to Step 2", async () => {
      await RegistrationPage.selectRole(user.role)
      await RegistrationPage.enterFirstName(user.firstName)
      await RegistrationPage.enterLastName(user.lastName)
      await RegistrationPage.enterPhone(user.phone)
      await RegistrationPage.looseFocusFormPhone()
      await driver.pause(3000)
      await RegistrationPage.enterEmail(user.email)
      await RegistrationPage.enterDateOfBirth(user.dateOfBirth)
      await RegistrationPage.tapNext()
    })
  })

  describe("Step 2 — PIN", () => {
    it("should enter and confirm PIN then proceed to Step 3", async () => {
      await RegistrationPage.enterPin(user.pin)
      await RegistrationPage.confirmPin(user.pin)
      await RegistrationPage.tapNext()
    })
  })
})
