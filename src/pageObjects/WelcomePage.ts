import { BasePage } from "./base/BasePage"

class WelcomePage extends BasePage {
  get createAccountButton(): string {
    return '//android.widget.Button[@content-desc="CREATE ACCOUNT"]'
  }

  get loginButton(): string {
    return '//android.widget.Button[@content-desc="LOGIN"]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.createAccountButton, 20000)
  }

  async tapCreateAccount(): Promise<void> {
    await this.tap(this.createAccountButton)
  }

  async tapLogin(): Promise<void> {
    await this.tap(this.loginButton)
  }
}

export default new WelcomePage()
