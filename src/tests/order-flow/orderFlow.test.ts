import { qaCustomer } from "@/data/customerData"
import { runCustomerLoginSteps } from "@/helpers/customerLoginFlow"
import { runLogoutSteps } from "@/helpers/customerLogoutFlow"
import { runPlaceOrderSteps } from "@/helpers/placeOrderFlow"
import { runPreCleanupSteps } from "@/helpers/preCleanupFlow"
import { runSetLocationSteps } from "@/helpers/setLocationFlow"

describe("Order Flow", () => {
  runPreCleanupSteps()
  runCustomerLoginSteps(qaCustomer)
  // runSetLocationSteps()
  runPlaceOrderSteps()
  runLogoutSteps()
})
