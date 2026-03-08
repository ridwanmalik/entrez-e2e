import { qaCustomer } from "@/data/customerData"
import { runCustomerLoginSteps } from "@/helpers/customerLoginFlow"
import { runCustomerLogoutSteps } from "@/helpers/customerLogoutFlow"
import { runPlaceOrderSteps } from "@/helpers/placeOrderFlow"

describe("Order Flow", () => {
  runCustomerLoginSteps(qaCustomer)
  runPlaceOrderSteps()
  runCustomerLogoutSteps()
})
