import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class ItemDetailPage extends BasePage {
  get selectOneSection(): string {
    return '//android.view.View[@content-desc="Select one"]'
  }

  get firstVariation(): string {
    return 'android=new UiSelector().descriptionContains("small pizza")'
  }

  get cokeSelector(): string {
    return 'android=new UiSelector().className("android.view.View").instance(16)'
  }

  get addToCartButton(): string {
    return '//android.widget.Button[@content-desc="Add to Cart"]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.selectOneSection, second(20))
  }

  async selectFirstVariation(): Promise<void> {
    await this.tap(this.firstVariation)
  }

  async selectCoke(): Promise<void> {
    await this.tap(this.cokeSelector)
  }

  async tapAddToCart(): Promise<void> {
    await this.tap(this.addToCartButton)
  }
}

export default new ItemDetailPage()
