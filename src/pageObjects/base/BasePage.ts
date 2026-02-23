import moment from "moment"

const DEFAULT_TIMEOUT = parseInt(process.env.EXPLICIT_WAIT_MS || "30000", 10)

export class BasePage {
  async waitForElement(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<WebdriverIO.Element> {
    const element = await $(selector)
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: `[BasePage] Element "${selector}" not visible after ${timeout}ms`,
    })
    return element
  }

  async waitForElementExist(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<WebdriverIO.Element> {
    const element = await $(selector)
    await element.waitForExist({
      timeout,
      timeoutMsg: `[BasePage] Element "${selector}" not in DOM after ${timeout}ms`,
    })
    return element
  }

  async tap(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
    const element = await this.waitForElement(selector, timeout)
    await element.click()
  }

  async setField(selector: string, value: string, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
    const element = await this.waitForElement(selector, timeout)
    await element.click()
    await element.clearValue()
    await driver.execute("mobile: type", { text: String(value) })
  }

  // Tap a neutral, non-interactive element to move focus away from the current
  // input field. Override in page classes to use a page-specific safe target.
  async looseFocus(): Promise<void> {
    const { width, height } = await driver.getWindowSize()
    await driver.execute("mobile: clickGesture", {
      x: Math.floor(width / 2),
      y: Math.floor(height * 0.05),
    })
  }

  async getText(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<string> {
    const element = await this.waitForElement(selector, timeout)
    return element.getText()
  }

  async isDisplayed(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<boolean> {
    try {
      const element = await $(selector)
      await element.waitForDisplayed({ timeout })
      return true
    } catch {
      return false
    }
  }

  async scrollDown(percent: number = 1.0): Promise<void> {
    const { width, height } = await driver.getWindowSize()
    await driver.execute("mobile: scrollGesture", {
      left: 0,
      top: Math.round(height * 0.25),
      width,
      height: Math.round(height * 0.5),
      direction: "down",
      percent,
    })
  }

  async scrollUp(percent: number = 1.0): Promise<void> {
    const { width, height } = await driver.getWindowSize()
    await driver.execute("mobile: scrollGesture", {
      left: 0,
      top: Math.round(height * 0.25),
      width,
      height: Math.round(height * 0.5),
      direction: "up",
      percent,
    })
  }

  async waitForLoaderToDisappear(
    loaderSelector: string = "~loading_indicator",
    timeout: number = DEFAULT_TIMEOUT
  ): Promise<void> {
    try {
      const loader = await $(loaderSelector)
      await loader.waitForDisplayed({ timeout: 3000 })
      await loader.waitForDisplayed({
        timeout,
        reverse: true,
        timeoutMsg: `[BasePage] Loader "${loaderSelector}" still visible after ${timeout}ms`,
      })
    } catch {
      // Loader did not appear or already gone — continue
    }
  }

  async takeScreenshot(name: string): Promise<string> {
    const safeName = name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "")
    const filePath = `reports/screenshots/${safeName}_${moment().format("YYYYMMDD_HHmmss")}.png`
    await driver.saveScreenshot(filePath)
    return filePath
  }
}
