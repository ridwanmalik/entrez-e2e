import { second } from "@/helpers/utils"
import { BasePage } from "@/pageObjects/base/BasePage"

class DriverHomePage extends BasePage {
  get workSchedulesHeading(): string {
    return 'android=new UiSelector().description("Upcoming Work Schedules")'
  }

  get orderCard(): string {
    return 'android=new UiSelector().descriptionContains("Delivery Address")'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.workSchedulesHeading, second(20))
  }

  async tapOrder(): Promise<void> {
    await this.tap(this.orderCard)
  }
}

export default new DriverHomePage()
