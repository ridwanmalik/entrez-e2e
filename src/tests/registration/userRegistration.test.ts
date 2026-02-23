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

  describe("Step 3 — Address", () => {
    it("should fill address fields and proceed to Step 4", async () => {
      await RegistrationPage.enterStreet(user.street)
      // await RegistrationPage.enterAdditionalAddress(user.additionalAddress)
      await RegistrationPage.enterCity(user.city)
      await RegistrationPage.enterPostalCode(user.postalCode)
      await RegistrationPage.tapNext()
    })
  })

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
