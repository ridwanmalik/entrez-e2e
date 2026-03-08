import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class CustomerDrawerPage extends BasePage {
  get logOutButton(): string {
    return '//android.widget.Button[@content-desc="Log Out"]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.logOutButton, second(10))
  }

  async tapLogOut(): Promise<void> {
    await this.tap(this.logOutButton)
  }
}

export default new CustomerDrawerPage()
