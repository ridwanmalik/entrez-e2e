import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class RestaurantMenuPage extends BasePage {
  get pizzaItem(): string {
    return '//android.view.View[@content-desc="Pizza"]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.pizzaItem, second(20))
  }

  get cartButton(): string {
    return 'android=new UiSelector().descriptionContains("See details in cart")'
  }

  async tapPizza(): Promise<void> {
    await this.tap(this.pizzaItem)
  }

  async tapCartButton(): Promise<void> {
    await this.tap(this.cartButton)
  }
}

export default new RestaurantMenuPage()
