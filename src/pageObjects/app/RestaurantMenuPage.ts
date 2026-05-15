import { second } from "@/helpers/utils"
import { BasePage } from "@/pageObjects/base/BasePage"

class RestaurantMenuPage extends BasePage {
  get firstMenuItem(): string {
    return '(//android.widget.ScrollView//android.widget.ImageView[@clickable="true"])[1]'
  }

  get deliveryTime(): string {
    return 'android=new UiSelector().descriptionStartsWith("Preparation Time")'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.deliveryTime, second(20))
  }

  get cartButton(): string {
    return 'android=new UiSelector().descriptionContains("See details in cart")'
  }

  async tapFirstItem(): Promise<void> {
    await this.tap(this.firstMenuItem)
  }

  async tapCartButton(): Promise<void> {
    await this.tap(this.cartButton)
  }
}

export default new RestaurantMenuPage()
