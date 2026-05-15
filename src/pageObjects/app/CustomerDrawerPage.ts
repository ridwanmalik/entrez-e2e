import { second } from "@/helpers/utils"
import { BasePage } from "@/pageObjects/base/BasePage"

class CustomerDrawerPage extends BasePage {
  get logOutButton(): string {
    return 'android=new UiSelector().description("Log Out")'
  }

  get logOutScrollableButton(): string {
    return 'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Log Out"))'
  }

  get okButton(): string {
    return 'android=new UiSelector().description("OK")'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.logOutButton, second(10))
  }

  async scrollLogOutIntoView(): Promise<void> {
    // if (await this.isDisplayed(this.logOutButton, second(2))) {
    //   return
    // }

    // try {
    //   const element = await $(this.logOutScrollableButton)
    //   await element.waitForDisplayed({ timeout: second(5) })
    //   return
    // } catch {
    //   // Fall back to coordinate swipes when the drawer is not exposed as UiScrollable.
    // }

    for (let attempt = 0; attempt < 3; attempt++) {
      await this.swipeDrawerUp()

      if (await this.isDisplayed(this.logOutButton, second(1))) {
        return
      }
    }
  }

  private async swipeDrawerUp(): Promise<void> {
    const { width, height } = await driver.getWindowSize()

    await driver.execute("mobile: swipeGesture", {
      left: 0,
      top: Math.round(height * 0.35),
      width: Math.round(width * 0.75),
      height: Math.round(height * 0.55),
      direction: "up",
      percent: 0.8,
    })

    await driver.pause(200)
  }

  async tapLogOut(): Promise<void> {
    await this.tap(this.logOutButton)
  }

  async tapOk(): Promise<void> {
    await this.tap(this.okButton)
  }
}

export default new CustomerDrawerPage()
