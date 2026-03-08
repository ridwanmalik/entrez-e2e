# Order Flow E2E Test — Plan

A full end-to-end order lifecycle test spanning the customer Android app, the partner web portal, and the driver Android app.

---

## Flow Overview

```
[Customer App]       [Partner Portal]       [Driver App]
     |                     |                     |
  1. Login             3. Login             5. Login
  2. Place order  -->  4. Accept order  -->  6. Pick up food
                          Ready for pickup       Deliver
```

---

## Architecture

This flow crosses two platforms (Android + web), so it cannot run in a single wdio session. The approach:

- **Three separate wdio configs** — one per platform segment, run in sequence by a shell script.
- **Shared state file** — `src/data/orderState.json` (git-ignored). Tests write and read order data (e.g. order ID, customer name) across sessions.
- **One yarn command** — `yarn test:order` — runs the full chain.
- **One test entry point** — `orderFlow.test.ts` — calls each step's flow helper in sequence.
- **Flow helpers** — one helper per step (e.g. `customerLoginFlow.ts`), containing the `describe`/`it` blocks. Same pattern as `registrationFlow.ts`.

```
yarn test:order
  └── orderFlow.test.ts
        ├── runCustomerLoginSteps()    (Android — customer login)
        ├── runPlaceOrderSteps()       (Android — place order)
        ├── runPartnerAcceptSteps()    (Chrome  — partner accept + ready)
        └── runDriverDeliverySteps()   (Android — pickup + delivered)
```

> Note: Because the customer/driver steps run on Android and the partner step runs on Chrome, the wdio config must switch between sessions. This will be handled by a shell script that runs the android config, then the web config, then the android config again — each pointing to `orderFlow.test.ts` with a `--spec` or suite filter.

---

## File Structure

```
src/
  tests/
    order-flow/
      orderFlow.test.ts              # single entry point — calls all flow helpers
  pageObjects/
    app/
      LoginPage.ts                   # DONE — customer login screen
      CustomerHomePage.ts            # customer home / restaurant listing
      CustomerOrderPage.ts           # cart, checkout, order confirmation
      DriverLoginPage.ts             # driver login screen
      DriverOrderPage.ts             # driver active delivery screen
    web/
      PartnerLoginPage.ts            # already exists
      PartnerOrdersPage.ts           # order list page in partner dashboard
      PartnerOrderDetailPage.ts      # single order — accept / ready buttons
  data/
    customerData.ts                  # DONE — qaCustomer credentials
    partnerData.ts                   # already exists — qaPartner credentials
    orderState.json                  # runtime shared state (git-ignored)
    orderState.ts                    # typed read/write helpers for the file
  helpers/
    utils.ts                         # already exists — second(), minute(), etc.
    customerLoginFlow.ts             # DONE — runCustomerLoginSteps()
    placeOrderFlow.ts                # runPlaceOrderSteps()
    partnerAcceptFlow.ts             # runPartnerAcceptSteps()
    driverDeliveryFlow.ts            # runDriverDeliverySteps()
config/
  wdio.android.conf.ts               # already exists — used for customer + driver steps
  wdio.web.conf.ts                   # already exists — used for partner step
```

---

## Shared State

`orderState.ts` exposes two helpers:

```typescript
// write after order is placed
saveOrderState({ orderId, customerName, restaurantName, items })

// read in partner and driver tests
loadOrderState(): OrderState
```

The JSON file is written by `02-placeOrder.test.ts` and read by `03-partnerAcceptOrder.test.ts` and `04-driverDelivery.test.ts`.

---

## Flow Helpers — Detailed Steps

### customerLoginFlow.ts — `runCustomerLoginSteps()` — DONE

- Assert login screen is displayed
- Enter email
- Enter password
- Tap login, assert home screen is visible

### placeOrderFlow.ts — `runPlaceOrderSteps()`

- Browse to a restaurant
- Add one or more items to cart
- Proceed to checkout
- Confirm delivery address (use `generateFinnishAddress()`)
- Place the order
- Assert order confirmation screen appears with an order ID
- Write `orderId` + order details to `orderState.json`

### partnerAcceptFlow.ts — `runPartnerAcceptSteps()`

- Open partner portal (`PartnerLoginPage.open()` with sleep-retry)
- Log in with `qaPartner` credentials
- Navigate to Orders page
- Find the order by ID (from `orderState.json`)
- Click **Accept order**
- Assert status changes to "Accepted"
- Click **Ready for pickup**
- Assert status changes to "Ready for pickup"

### driverDeliveryFlow.ts — `runDriverDeliverySteps()`

- Open driver app
- Log in with driver credentials
- Assert the pending order appears (matched by order ID or restaurant name)
- Tap **Pick up** / confirm pickup
- Assert status changes to "Picked up"
- Tap **Delivered**
- Assert status changes to "Delivered"

---

## New Page Objects — What Each Needs

| Page Object              | Key selectors / methods                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LoginPage`      | email input, password input, login button, `login(email, pw)`, `isLoggedIn()`                                                                     |
| `CustomerHomePage`       | restaurant list, `openRestaurant(name)`                                                                                                           |
| `CustomerOrderPage`      | item list, add-to-cart button, cart summary, checkout button, address field, place-order button, order ID element, `placeOrder()`, `getOrderId()` |
| `DriverLoginPage`        | email, password, submit, `login()`, `isLoggedIn()`                                                                                                |
| `DriverOrderPage`        | active order card, pickup button, deliver button, status label, `confirmPickup()`, `confirmDelivered()`, `getStatus()`                            |
| `PartnerOrdersPage`      | order list/table, `findOrder(orderId)`, `openOrder(orderId)`                                                                                      |
| `PartnerOrderDetailPage` | accept button, ready-for-pickup button, status label, `acceptOrder()`, `markReadyForPickup()`, `getStatus()`                                      |

---

## package.json Script

```json
"test:order": "wdio run config/wdio.android.conf.ts --spec src/tests/order-flow/orderFlow.test.ts"
```

> This will evolve into a chained script once partner (web) steps are added, since those require a separate wdio session with the Chrome config.

---

## Data / Credentials Needed

Before implementation, confirm:

- [ ] Customer app credentials (email + password for a test account)
- [ ] Driver app credentials (email + password)
- [ ] Whether driver app is a separate APK or the same app with a role switch
- [ ] Partner portal credentials — already in `partnerData.ts` (`qaPartner`)
- [ ] How the order ID is exposed on the confirmation screen (text, accessibility label, URL?)
- [ ] How the partner orders page lists orders (by ID, by customer name, by time?)
- [ ] Order status label text for each state (e.g. "Accepted", "Ready for pickup", "Delivered")

---

## Open Questions

1. Is state shared via a JSON file acceptable, or should it go through an API/DB query?
2. Does the driver app require a different device/emulator, or the same one (sequential)?
3. Should the three wdio sessions run on the same physical device or can Android tests reuse the same UDID?
4. Should failed intermediate steps halt the whole chain (`set -e` in shell) or should later steps still attempt to run?
