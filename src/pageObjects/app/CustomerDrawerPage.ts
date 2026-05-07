import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class CustomerDrawerPage extends BasePage {
  get logOutButton(): string {
    return '//android.widget.Button[@content-desc="Log Out"]'
  }

  get okButton(): string {
    return 'android=new UiSelector().description("OK")'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.logOutButton, second(10))
  }

  async tapLogOut(): Promise<void> {
    await this.tap(this.logOutButton)
  }

  async tapOk(): Promise<void> {
    await this.tap(this.okButton)
  }
}

export default new CustomerDrawerPage()
