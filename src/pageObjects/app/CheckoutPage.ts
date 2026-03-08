import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class CheckoutPage extends BasePage {
  get heading(): string {
    return '//android.view.View[@content-desc="Checkout"]'
  }

  get placeOrderButton(): string {
    return '//android.view.View[@content-desc="Place Order"]'
  }

  get okButton(): string {
    return '//android.widget.Button[@content-desc="OK"]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.heading, second(20))
  }

  async tapPlaceOrder(): Promise<void> {
    await this.tap(this.placeOrderButton)
  }

  async tapOk(): Promise<void> {
    await this.tap(this.okButton)
  }
}

export default new CheckoutPage()
