import { PartnerData } from '@/data/partnerData'
import { BaseWebPage } from '@/pageObjects/base/BaseWebPage'

class PartnerPortalPage extends BaseWebPage {
  // ── Selectors ───────────────────────────────────────────────────────────────

  // Business ID — triggers auto-fill of business name
  get businessIdInput(): string { return '#text_business_id' }

  // Business Type — regular <select>, must be selected manually
  get businessTypeSelect(): string { return 'select[name="business_type"]' }

  // Address fields — filled manually
  get addressInput(): string { return '#text_business_address' }   // Google Maps autocomplete
  get postalCodeInput(): string { return '#text_business_postal_code' }
  get cityInput(): string { return '#text_business_city' }

  // Contact person
  get firstNameInput(): string { return '#text_first_name' }
  get lastNameInput(): string { return '#text_last_name' }
  get mobileInput(): string { return '#mobile' }
  get emailInput(): string { return '#text_email' }

  get submitButton(): string { return 'button[type="submit"]' }
  get successMessage(): string { return '.alert-success, [class*="success"]' }

  // ── Page state ───────────────────────────────────────────────────────────────

  async open(): Promise<void> {
    const maxWaitMs = 120000  // 2 minutes
    const retryIntervalMs = 10000
    const started = Date.now()

    await browser.url('/')

    while (!(await this.isDisplayed('div.join-courier', 5000))) {
      if (Date.now() - started > maxWaitMs) {
        throw new Error('[PartnerPortalPage] Server did not become available after 2 minutes')
      }
      console.log('[PartnerPortalPage] Server not ready (possibly 502), retrying in 10s...')
      await browser.pause(retryIntervalMs)
      await browser.refresh()
    }
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.businessIdInput)
  }

  // ── Form actions ─────────────────────────────────────────────────────────────

  async enterBusinessId(id: string): Promise<void> {
    await this.fill(this.businessIdInput, id)
  }

  // After entering the business ID, the form auto-fills name and type.
  // Wait briefly for the Livewire update to complete.
  async waitForAutoFill(): Promise<void> {
    await browser.pause(2000)
  }

  async selectBusinessType(type: string): Promise<void> {
    await this.selectByText(this.businessTypeSelect, type)
  }

  async enterAddress(address: string): Promise<void> {
    await this.fill(this.addressInput, address)
    // Dismiss the Google Maps Places autocomplete dropdown
    await browser.keys('Escape')
  }

  async enterPostalCode(postalCode: string): Promise<void> {
    await this.fill(this.postalCodeInput, postalCode)
  }

  async enterCity(city: string): Promise<void> {
    await this.fill(this.cityInput, city)
  }

  async enterFirstName(name: string): Promise<void> {
    await this.fill(this.firstNameInput, name)
  }

  async enterLastName(name: string): Promise<void> {
    await this.fill(this.lastNameInput, name)
  }

  async enterMobile(mobile: string): Promise<void> {
    // The form already shows +358 as a static prefix, so strip it from the number
    const localNumber = mobile.startsWith('358') ? mobile.slice(3) : mobile
    await this.fill(this.mobileInput, localNumber)
  }

  async enterEmail(email: string): Promise<void> {
    await this.fill(this.emailInput, email)
  }

  async submitApplication(): Promise<void> {
    await this.scrollTo(this.submitButton)
    await this.click(this.submitButton)
  }

  // ── Full form fill ───────────────────────────────────────────────────────────

  async fillForm(partner: PartnerData): Promise<void> {
    await this.enterBusinessId(partner.businessId)
    await this.waitForAutoFill()
    await this.selectBusinessType(partner.businessType)
    await this.enterAddress(partner.address)
    await this.enterPostalCode(partner.postalCode)
    await this.enterCity(partner.city)
    await this.enterFirstName(partner.firstName)
    await this.enterLastName(partner.lastName)
    await this.enterMobile(partner.mobile)
    await this.enterEmail(partner.email)
  }
}

export default new PartnerPortalPage()
