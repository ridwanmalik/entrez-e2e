import CustomerDrawerPage from "@/pageObjects/app/CustomerDrawerPage"
import CustomerHomePage from "@/pageObjects/app/CustomerHomePage"
import WelcomePage from "@/pageObjects/WelcomePage"

interface LogoutOptions {
  confirmLogout?: boolean
  scrollToLogout?: boolean
}

export const runLogoutSteps = ({ confirmLogout = false, scrollToLogout = false }: LogoutOptions = {}) => {
  describe("Step 3 — Logout", () => {
    it("should tap the account tab to open the drawer", async () => {
      await CustomerHomePage.tapAccountTab()
    })

    it("should see the drawer with the Log Out button", async () => {
      if (scrollToLogout) {
        await CustomerDrawerPage.scrollLogOutIntoView()
      }

      expect(await CustomerDrawerPage.isLoaded()).toBe(true)
    })

    it("should tap Log Out", async () => {
      await CustomerDrawerPage.tapLogOut()
    })

    if (confirmLogout) {
      it("should tap OK on the confirmation popup", async () => {
        await CustomerDrawerPage.tapOk()
      })
    }

    it("should land back on the Welcome page", async () => {
      expect(await WelcomePage.isLoaded()).toBe(true)
    })
  })
}
