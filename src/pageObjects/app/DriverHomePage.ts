import { second } from "@/helpers/utils"
import { BasePage } from "@/pageObjects/base/BasePage"

class DriverHomePage extends BasePage {
  get workSchedulesHeading(): string {
    return 'android=new UiSelector().description("Upcoming Work Schedules")'
  }

  get orderCard(): string {
    return 'android=new UiSelector().descriptionContains("Delivery Address")'
  }

  get goOnlineButton(): string {
    return 'android=new UiSelector().description("Go Online")'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.workSchedulesHeading, second(30))
  }

  async tapGoOnlineIfPrompted(): Promise<void> {
    if (await this.isDisplayed(this.goOnlineButton, second(15))) {
      await this.tap(this.goOnlineButton)
      return
    }
  }

  async tapOrder(): Promise<void> {
    await this.tap(this.orderCard)
  }
}

export default new DriverHomePage()
