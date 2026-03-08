import { minute, second } from "@/helpers/utils"
import { BasePage } from "@/pageObjects/base/BasePage"

class DriverSelectionPage extends BasePage {
  get heading(): string {
    return '//android.view.View[@content-desc="Driver Selection"]'
  }

  get specificDriverCard(): string {
    return 'android=new UiSelector().descriptionContains("Nibir")'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.heading, second(20))
  }

  get confirmButton(): string {
    return '//android.view.View[@content-desc="CONFIRM"]'
  }

  async selectDriver(): Promise<void> {
    await this.tap(this.specificDriverCard, minute(3))
  }

  async tapConfirm(): Promise<void> {
    await this.tap(this.confirmButton)
  }
}

export default new DriverSelectionPage()
