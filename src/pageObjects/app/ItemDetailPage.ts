import { BasePage } from "@/pageObjects/base/BasePage"
import { second } from "@/helpers/utils"

class ItemDetailPage extends BasePage {
  get menuSubtotal(): string {
    return 'android=new UiSelector().description("Menu Subtotal")'
  }

  get firstVariation(): string {
    return '(//android.widget.ScrollView//android.view.View[android.widget.RadioButton][@clickable="true"])[1]'
  }

  get cokeSelector(): string {
    return 'android=new UiSelector().className("android.view.View").instance(16)'
  }

  get addToCartButton(): string {
    return '//android.widget.Button[@content-desc="Add to Cart"]'
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.menuSubtotal, second(20))
  }

  async selectFirstVariationIfPresent(): Promise<void> {
    const hasVariations = await this.isDisplayed(this.firstVariation, second(3))
    if (hasVariations) {
      await this.tap(this.firstVariation)
    }
  }

  async selectCoke(): Promise<void> {
    await this.tap(this.cokeSelector)
  }

  async tapAddToCart(): Promise<void> {
    await this.tap(this.addToCartButton)
  }
}

export default new ItemDetailPage()
