import { second } from "@/helpers/utils"
import { BaseWebPage } from "@/pageObjects/base/BaseWebPage"

class PartnerLoginPage extends BaseWebPage {
  // ── Selectors ───────────────────────────────────────────────────────────────

  get emailInput(): string {
    return 'input[type="email"]'
  }

  get passwordInput(): string {
    return 'input[type="password"]'
  }

  get submitButton(): string {
    return 'button[type="submit"]'
  }

  // Shown in the top navbar after a successful login
  get userNameDisplay(): string {
    return ".header-info span"
  }

  // Breadcrumb title rendered on every authenticated page
  get dashboardBar(): string {
    return ".dashboard_bar"
  }

  // ── Page state ───────────────────────────────────────────────────────────────

  async open(): Promise<void> {
    await browser.url("/login")
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.emailInput)
  }

  async isDashboardLoaded(timeout?: number): Promise<boolean> {
    return this.isDisplayed(this.dashboardBar, timeout)
  }

  // ── Form actions ─────────────────────────────────────────────────────────────

  async enterEmail(email: string): Promise<void> {
    await this.fill(this.emailInput, email)
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password)
  }

  async submitLogin(): Promise<void> {
    await this.click(this.submitButton)
  }

  async getLoggedInName(): Promise<string> {
    return this.getText(this.userNameDisplay)
  }
}

export default new PartnerLoginPage()
