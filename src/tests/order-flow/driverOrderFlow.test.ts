import { qaDriver } from "@/data/driverData"
import { runLogoutSteps } from "@/helpers/customerLogoutFlow"
import { runDriverDeliverySteps } from "@/helpers/driverDeliveryFlow"
import { runDriverLoginSteps } from "@/helpers/driverLoginFlow"

describe("Driver Order Flow", () => {
  runDriverLoginSteps(qaDriver)
  runDriverDeliverySteps()
  runLogoutSteps()
})
