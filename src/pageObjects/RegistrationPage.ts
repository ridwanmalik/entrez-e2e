import { Role } from "@/data/testData"
import { second } from "@/helpers/utils"
import moment from "moment"
import { BasePage } from "./base/BasePage"

class RegistrationPage extends BasePage {
  get screenTitle(): string {
    return "~CREATE ACCOUNT"
  }
  get clientRole(): string {
    return '//android.widget.ImageView[@content-desc="Client"]'
  }
  get serviceRole(): string {
    return '//android.widget.ImageView[@content-desc="Service"]'
  }
  get firstNameInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(0)'
  }
  get lastNameInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(1)'
  }
  get phoneInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(2)'
  }
  get emailInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(3)'
  }
  get emailInScrollView(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(1)'
  }
  get pinInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(0)'
  }
  get confirmPinInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(1)'
  }
  get confirmPinInputInScrollView(): string {
    return 'android=new UiSelector().className("android.widget.EditText")'
  }
  get streetInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(0)'
  }
  get additionalAddressInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(1)'
  }
  get additionalAddressInputInScrollView(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(0)'
  }
  get cityInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(2)'
  }
  get postalCodeInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(3)'
  }
  get postalCodeInputInScrollView(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(0)'
  }
  get dateOfBirthTrigger(): string {
    return 'android=new UiSelector().className("android.view.View").instance(17)'
  }
  get datePickerDay(): string {
    return 'android=new UiSelector().className("android.widget.SeekBar").instance(0)'
  }
  get datePickerMonth(): string {
    return 'android=new UiSelector().className("android.widget.SeekBar").instance(1)'
  }
  get datePickerYear(): string {
    return 'android=new UiSelector().className("android.widget.SeekBar").instance(2)'
  }
  get datePickerOk(): string {
    return "~OK"
  }
  get nextButton(): string {
    return '(//android.widget.ImageView[@clickable="true" and not(@content-desc)])[last()]'
  }
  get createAccountButton(): string {
    return '//android.widget.Button[@content-desc="Create Account"]'
  }
  get registrationSuccessDialog(): string {
    return '//android.view.View[@content-desc="Registration Successful"]'
  }
  get okButton(): string {
    return '//android.widget.Button[@content-desc="OK"]'
  }
  get prevButton(): string {
    return '(//android.widget.ImageView[@clickable="true" and not(@content-desc)])[1]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.clientRole, 15000)
  }

  async looseFocusFormPhone(): Promise<void> {
    await this.tap(this.emailInput)
  }

  async selectRole(role: Role = Role.Client): Promise<void> {
    await this.tap(role === Role.Client ? this.clientRole : this.serviceRole)
  }

  async enterFirstName(name: string): Promise<void> {
    await this.setField(this.firstNameInput, name)
  }
  async enterLastName(name: string): Promise<void> {
    await this.setField(this.lastNameInput, name)
  }
  async enterPhone(phone: string): Promise<void> {
    await this.setField(this.phoneInput, phone)
  }
  async enterEmail(email: string): Promise<void> {
    try {
      await this.setField(this.emailInput, email, second(1))
    } catch (error) {
      await this.setField(this.emailInScrollView, email)
    }
  }

  // dateStr format: 'DD/MM/YYYY'
  async enterDateOfBirth(dateStr: string): Promise<void> {
    await this.tap(this.dateOfBirthTrigger)

    const date = moment(dateStr, "DD/MM/YYYY")
    const day = 28 // date.date()
    const month = date.month() + 1
    const year = date.year()

    const curDay = parseInt(await $(this.datePickerDay).getAttribute("content-desc"))
    const curMonth =
      moment()
        .month(await $(this.datePickerMonth).getAttribute("content-desc"))
        .month() + 1
    const curYear = parseInt(await $(this.datePickerYear).getAttribute("content-desc"))
    console.log(`🔥 | curMonth, month:`, curMonth, month)
    await this._scrollPickerTo(this.datePickerYear, curYear, year)
    await this._scrollPickerTo(this.datePickerMonth, curMonth, month)
    await this._scrollPickerTo(this.datePickerDay, curDay, day)
    await this.tap(this.datePickerOk)
  }

  async _scrollPickerTo(selector: string, from: number, to: number): Promise<void> {
    if (from === to) return
    const el = await $(selector)
    const { x, y } = await el.getLocation()
    const { width, height } = await el.getSize()
    const direction = to > from ? "up" : "down"
    const steps = Math.abs(to - from)

    for (let i = 0; i < steps; i++) {
      await driver.execute("mobile: swipeGesture", { left: x, top: y, width, height, direction, percent: 0.3 })
      await driver.pause(100)
    }
  }

  async enterPin(pin: string): Promise<void> {
    await this.setField(this.pinInput, pin)
  }
  async confirmPin(pin: string): Promise<void> {
    try {
      await this.setField(this.confirmPinInput, pin, second(1))
    } catch (error) {
      await this.setField(this.confirmPinInputInScrollView, pin)
    }
  }

  async enterStreet(street: string): Promise<void> {
    await this.setField(this.streetInput, street)
  }
  async enterAdditionalAddress(additional: string): Promise<void> {
    try {
      await this.setField(this.additionalAddressInput, additional, second(1))
    } catch (error) {
      await this.setField(this.additionalAddressInputInScrollView, additional)
    }
  }
  async enterCity(city: string): Promise<void> {
    await this.setField(this.cityInput, city)
  }
  async enterPostalCode(postalCode: string): Promise<void> {
    try {
      await this.setField(this.postalCodeInput, postalCode, second(1))
    } catch (error) {
      await this.setField(this.postalCodeInputInScrollView, postalCode)
    }
  }

  async tapNext(): Promise<void> {
    await this.tap(this.nextButton)
  }

  async tapCreateAccount(): Promise<void> {
    await this.tap(this.createAccountButton)
  }
}

export default new RegistrationPage()
