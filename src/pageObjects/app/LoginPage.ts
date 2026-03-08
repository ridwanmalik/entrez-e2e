import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class LoginPage extends BasePage {
  get loginHeading(): string {
    return '//android.view.View[@content-desc="Log in to your account"]'
  }

  get phoneInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(0)'
  }

  get passwordInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(1)'
  }

  get loginButton(): string {
    return '//android.widget.Button[@content-desc="LOGIN"]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.loginHeading, second(20))
  }

  async enterPhone(phone: string): Promise<void> {
    await this.setField(this.phoneInput, phone)
  }

  async enterPassword(password: string): Promise<void> {
    await this.setField(this.passwordInput, password)
  }

  async tapLogin(): Promise<void> {
    await this.tap(this.loginButton)
  }
}

export default new LoginPage()
