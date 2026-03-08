import { qaOrderPartner } from "@/data/partnerData"
import { runPartnerLoginSteps } from "@/helpers/partnerLoginFlow"
import { minute, second } from "@/helpers/utils"

describe("Partner Order Flow", () => {
  after(async () => {
    await browser.pause(minute(10))
  })

  runPartnerLoginSteps(qaOrderPartner)
})
