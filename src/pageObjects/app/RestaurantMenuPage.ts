import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class RestaurantMenuPage extends BasePage {
  get firstMenuItem(): string {
    return "(//android.widget.ScrollView//android.widget.ImageView)[1]"
  }

  get deliveryTime(): string {
    return 'android=new UiSelector().descriptionStartsWith("Delivery:")'
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
