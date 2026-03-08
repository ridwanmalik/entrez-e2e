import { BaseWebPage } from "@/pageObjects/base/BaseWebPage"

class PartnerOrdersPage extends BaseWebPage {
  get orderBoardHeading(): string {
    return '.dashboard_bar=Order Board'
  }

  get firstReadyForProcessButton(): string {
    return '.order-card button[title="Ready for Process"]'
  }

  get firstReadyForPickupButton(): string {
    return '.order-card button.button-tick'
  }

  async open(): Promise<void> {
    await browser.url("/member/orders")
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.orderBoardHeading)
  }

  async tapReadyForProcess(): Promise<void> {
    await this.click(this.firstReadyForProcessButton)
  }

  async tapReadyForPickup(): Promise<void> {
    await this.click(this.firstReadyForPickupButton)
  }
}

export default new PartnerOrdersPage()
