import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class CartPage extends BasePage {
  get cartHeading(): string {
    return '//android.view.View[@content-desc="My Cart"]'
  }

  get continueButton(): string {
    return '//android.view.View[@content-desc="Continue"]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.cartHeading, second(20))
  }

  async tapContinue(): Promise<void> {
    await this.tap(this.continueButton)
  }
}

export default new CartPage()
