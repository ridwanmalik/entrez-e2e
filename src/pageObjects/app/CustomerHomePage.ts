import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class CustomerHomePage extends BasePage {
  get searchBar(): string {
    return '//android.widget.ImageView[@content-desc="Search for foods, restaurants, services"]'
  }

  get foodsTab(): string {
    return '//android.view.View[@content-desc="FOODS"]'
  }

  restaurantItem(index: number): string {
    return `(//android.view.View[@content-desc="Nearby restaurants"]//android.widget.ImageView)[${index + 1}]`
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.searchBar, second(20))
  }

  async tapFoodsIfVisible(): Promise<void> {
    if (await this.isDisplayed(this.foodsTab, second(3))) {
      await this.tap(this.foodsTab)
    }
  }

  async tapRestaurant(index: number): Promise<void> {
    await this.tap(this.restaurantItem(index))
  }
}

export default new CustomerHomePage()
