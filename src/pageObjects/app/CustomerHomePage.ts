import { second } from "@/helpers/utils"
import { BasePage } from "@/pageObjects/base/BasePage"

class CustomerHomePage extends BasePage {
  get locationBar(): string {
    return 'android=new UiSelector().descriptionStartsWith("Current Location")'
  }

  get locationSearchInput(): string {
    return 'android=new UiSelector().className("android.widget.EditText").instance(0)'
  }

  get locationClearButton(): string {
    return 'android=new UiSelector().className("android.widget.Button").instance(1)'
  }

  locationSuggestionItem(street: string): string {
    return `android=new UiSelector().descriptionStartsWith("${street}")`
  }

  get chooseLocationButton(): string {
    return 'android=new UiSelector().description("CHOOSE THIS LOCATION")'
  }

  get searchBar(): string {
    return '//android.widget.ImageView[@content-desc="Search for foods, restaurants, services"]'
  }

  get foodsTab(): string {
    return '//android.view.View[@content-desc="FOODS"]'
  }

  get accountTab(): string {
    return '//android.widget.ImageView[@content-desc="Tab 1 of 4"]'
  }

  restaurantItem(index: number): string {
    return `(//android.view.View[@content-desc="Nearby restaurants"]//android.widget.ImageView)[${index + 1}]`
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.searchBar, second(20))
  }

  async tapLocationBar(): Promise<void> {
    await this.tap(this.locationBar)
  }

  async enterLocationSearch(address: string): Promise<void> {
    await this.waitForElement(this.locationSearchInput)
    // Wait for the field to settle before clearing
    await driver.pause(second(5))
    await this.tap(this.locationClearButton)
    // Dismiss the autofill popup by tapping the centre of the screen
    const { width, height } = await driver.getWindowSize()
    await driver.execute("mobile: clickGesture", {
      x: Math.floor(width / 2),
      y: Math.floor(height / 2),
    })
    await driver.execute("mobile: type", { text: address })
  }

  async tapLocationSuggestion(street: string): Promise<void> {
    await this.tap(this.locationSuggestionItem(street))
  }

  async tapChooseLocation(): Promise<void> {
    await this.tap(this.chooseLocationButton)
  }

  async tapFoodsIfVisible(): Promise<void> {
    if (await this.isDisplayed(this.foodsTab, second(3))) {
      await this.tap(this.foodsTab)
    }
  }

  async tapRestaurant(index: number): Promise<void> {
    await this.tap(this.restaurantItem(index))
  }

  async tapAccountTab(): Promise<void> {
    await this.tap(this.accountTab)
  }
}

export default new CustomerHomePage()
