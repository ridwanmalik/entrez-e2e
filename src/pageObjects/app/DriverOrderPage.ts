import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class DriverOrderPage extends BasePage {
  get estimatedDeliveryTime(): string {
    return '//android.view.View[@content-desc="Estimated remaining time of delivery:"]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.estimatedDeliveryTime, second(20))
  }

  async slideToStartDelivery(): Promise<void> {
    const { width } = await driver.getWindowSize()
    await driver.execute("mobile: dragGesture", {
      startX: 373,
      startY: 1125,
      endX: width - 50,
      endY: 1125,
      speed: 1000,
    })
  }

  async slideToFinishDelivery(): Promise<void> {
    const { width } = await driver.getWindowSize()
    await driver.execute("mobile: dragGesture", {
      startX: 373,
      startY: 1125,
      endX: width - 50,
      endY: 1125,
      speed: 1000,
    })
  }

  get deliverySuccessPopup(): string {
    return 'android=new UiSelector().descriptionContains("Order is delivered")'
  }

  get okButton(): string {
    return '//android.widget.Button[@content-desc="OK"]'
  }

  async isDeliverySuccessVisible(): Promise<boolean> {
    return this.isDisplayed(this.deliverySuccessPopup, second(20))
  }

  async tapOk(): Promise<void> {
    await this.tap(this.okButton)
  }
}

export default new DriverOrderPage()
