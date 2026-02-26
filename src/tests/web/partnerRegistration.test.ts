import { validPartner } from '@/data/partnerData'
import { second } from '@/helpers/utils'
import PartnerPortalPage from '@/pageObjects/web/PartnerPortalPage'

describe('Partner Portal — Join Partner Registration', () => {
  const partner = validPartner()

  before(async () => {
    await PartnerPortalPage.open()
  })

  after(async () => {
    await browser.pause(second(3))
  })

  it('should load the partner portal home page with the join form', async () => {
    expect(await PartnerPortalPage.isLoaded()).toBe(true)
  })

  it('should enter a valid business ID and wait for auto-fill', async () => {
    await PartnerPortalPage.enterBusinessId(partner.businessId)
    await PartnerPortalPage.waitForAutoFill()
  })

  it('should select a business type', async () => {
    await PartnerPortalPage.selectBusinessType(partner.businessType)
  })

  it('should fill in the address details', async () => {
    await PartnerPortalPage.enterAddress(partner.address)
    await PartnerPortalPage.enterPostalCode(partner.postalCode)
    await PartnerPortalPage.enterCity(partner.city)
  })

  it('should fill in the contact person details', async () => {
    await PartnerPortalPage.enterFirstName(partner.firstName)
    await PartnerPortalPage.enterLastName(partner.lastName)
    await PartnerPortalPage.enterMobile(partner.mobile)
    await PartnerPortalPage.enterEmail(partner.email)
  })

  it('should submit the application successfully', async () => {
    await PartnerPortalPage.submitApplication()
    expect(await PartnerPortalPage.isDisplayed(PartnerPortalPage.successMessage, 10000)).toBe(true)
  })
})
