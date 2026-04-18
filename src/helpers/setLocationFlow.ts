import { FinnishAddress, generateFinnishAddress } from "@/helpers/utils"
import CustomerHomePage from "@/pageObjects/app/CustomerHomePage"

export const runSetLocationSteps = () => {
  describe("Step — Set Delivery Location", () => {
    let address: FinnishAddress

    it("should tap the location bar on the home page", async () => {
      expect(await CustomerHomePage.isLoaded()).toBe(true)
      await CustomerHomePage.tapLocationBar()
    })

    it("should clear the field and enter a Finnish delivery address", async () => {
      address = generateFinnishAddress()
      await CustomerHomePage.enterLocationSearch(`${address.street}, ${address.city}`)
    })

    it("should tap the first suggestion from the dropdown", async () => {
      await CustomerHomePage.tapLocationSuggestion(address.street)
    })

    it("should confirm the location by tapping CHOOSE THIS LOCATION", async () => {
      await CustomerHomePage.tapChooseLocation()
    })
  })
}
