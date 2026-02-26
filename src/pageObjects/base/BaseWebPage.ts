const DEFAULT_TIMEOUT = parseInt(process.env.EXPLICIT_WAIT_MS || '15000', 10)

export class BaseWebPage {
  async waitForElement(selector: string, timeout = DEFAULT_TIMEOUT): Promise<WebdriverIO.Element> {
    const el = await $(selector)
    await el.waitForDisplayed({
      timeout,
      timeoutMsg: `[BaseWebPage] Element "${selector}" not visible after ${timeout}ms`,
    })
    return el
  }

  async click(selector: string, timeout = DEFAULT_TIMEOUT): Promise<void> {
    const el = await this.waitForElement(selector, timeout)
    await el.click()
  }

  async fill(selector: string, value: string, timeout = DEFAULT_TIMEOUT): Promise<void> {
    const el = await this.waitForElement(selector, timeout)
    await el.clearValue()
    await el.setValue(value)
  }

  async selectByText(selector: string, text: string, timeout = DEFAULT_TIMEOUT): Promise<void> {
    const el = await this.waitForElement(selector, timeout)
    await el.selectByVisibleText(text)
  }

  async getText(selector: string, timeout = DEFAULT_TIMEOUT): Promise<string> {
    const el = await this.waitForElement(selector, timeout)
    return el.getText()
  }

  async isDisplayed(selector: string, timeout = DEFAULT_TIMEOUT): Promise<boolean> {
    try {
      const el = await $(selector)
      await el.waitForDisplayed({ timeout })
      return true
    } catch {
      return false
    }
  }

  async scrollTo(selector: string, timeout = DEFAULT_TIMEOUT): Promise<void> {
    const el = await this.waitForElement(selector, timeout)
    await el.scrollIntoView()
  }

  // Tom Select is a custom searchable dropdown. It hides the native <select>
  // and replaces it with a custom input + dropdown overlay.
  // Pass the Tom Select input's element ID (e.g. 'country_id_select-ts-control').
  // Tom Select follows a predictable ID pattern:
  //   input:    {base}-ts-control
  //   dropdown: {base}-ts-dropdown
  async selectTomSelect(tsInputId: string, optionText: string): Promise<void> {
    const input = await $(`#${tsInputId}`)
    await input.scrollIntoView()
    await input.click()
    await input.setValue(optionText)

    // Derive dropdown container ID from input ID
    const dropdownId = tsInputId.replace('-ts-control', '-ts-dropdown')
    const option = await $(`#${dropdownId} .option=${optionText}`)
    await option.waitForDisplayed({ timeout: DEFAULT_TIMEOUT })
    await option.click()
  }
}
