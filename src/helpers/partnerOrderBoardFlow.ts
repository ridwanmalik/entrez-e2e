import { second } from "@/helpers/utils"
import PartnerOrdersPage from "@/pageObjects/web/PartnerOrdersPage"

export const runPartnerOrderBoardSteps = () => {
  describe("Step 5 — Partner Order Board", () => {
    it("should navigate to the Order Board", async () => {
      await PartnerOrdersPage.open()
    })

    it("should land on the Order Board page", async () => {
      expect(await PartnerOrdersPage.isLoaded()).toBe(true)
    })

    it("should tap Ready for Process on the first order", async () => {
      await PartnerOrdersPage.tapReadyForProcess()
    })

    it("should wait and then tap Ready for Pickup", async () => {
      await browser.pause(second(10))
      await PartnerOrdersPage.tapReadyForPickup()
    })
  })
}
