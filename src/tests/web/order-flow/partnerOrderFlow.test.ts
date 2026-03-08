import { qaOrderPartner } from "@/data/partnerData"
import { runPartnerLoginSteps } from "@/helpers/partnerLoginFlow"
import { runPartnerOrderBoardSteps } from "@/helpers/partnerOrderBoardFlow"
import { second } from "@/helpers/utils"

describe("Partner Order Flow", () => {
  after(async () => {
    await browser.pause(second(10))
  })

  runPartnerLoginSteps(qaOrderPartner)
  runPartnerOrderBoardSteps()
})
