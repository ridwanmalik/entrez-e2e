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

- **Three wdio sessions** chained by `&&` in `package.json` — customer Android → partner Chrome → driver Android.
- **Flow helpers** — one helper per step (e.g. `customerLoginFlow.ts`), containing the `describe`/`it` blocks. Same pattern as `registrationFlow.ts`.

```
yarn test:order
  ├── [Android #1] orderFlow.test.ts
  │     ├── runCustomerLoginSteps()        (customer login)
  │     ├── runPlaceOrderSteps()           (place order)
  │     └── runCustomerLogoutSteps()       (logout)
  ├── [Chrome]     partnerOrderFlow.test.ts
  │     ├── runPartnerLoginSteps()         (partner login)
  │     └── runPartnerOrderBoardSteps()    (ready for process → ready for pickup)
  └── [Android #2] driverOrderFlow.test.ts
        └── runDriverDeliverySteps()       (driver login, pickup, deliver)
```

> Sessions are chained with `&&` — if any session fails, subsequent sessions are skipped.

---

## File Structure

```
src/
  tests/
    order-flow/
      orderFlow.test.ts              # DONE — Android #1 (customer login, place order, logout)
      driverOrderFlow.test.ts        # DONE — Android #2 (driver login, pickup, deliver)
    web/
      order-flow/
        partnerOrderFlow.test.ts     # DONE — Chrome (partner login, order board)
  pageObjects/
    app/
      LoginPage.ts                   # DONE — customer login screen
      CustomerHomePage.ts            # DONE — customer home / restaurant listing
      RestaurantMenuPage.ts          # DONE — restaurant menu, tap items, tap cart
      ItemDetailPage.ts              # DONE — item detail, variations, drink selection, add to cart
      CartPage.ts                    # DONE — cart summary, continue button
      DriverSelectionPage.ts         # DONE — driver selection in checkout flow
      CheckoutPage.ts                # DONE — final checkout, place order, dismiss confirmation
      CustomerDrawerPage.ts          # DONE — left-side drawer, log out button
      DriverLoginPage.ts             # DONE — driver login screen
      DriverHomePage.ts              # DONE — driver home, tap active order
      DriverOrderPage.ts             # DONE — driver active delivery screen
    web/
      PartnerLoginPage.ts            # DONE — login form
      PartnerOrdersPage.ts           # DONE — order board, ready for process, ready for pickup
  data/
    customerData.ts                  # DONE — qaCustomer credentials
    partnerData.ts                   # already exists — qaPartner credentials
    orderState.json                  # runtime shared state (git-ignored)
    orderState.ts                    # typed read/write helpers for the file
  helpers/
    utils.ts                         # already exists — second(), minute(), etc.
    customerLoginFlow.ts             # DONE — runCustomerLoginSteps()
    placeOrderFlow.ts                # DONE — runPlaceOrderSteps()
    customerLogoutFlow.ts            # DONE — runCustomerLogoutSteps()
    partnerLoginFlow.ts              # DONE — runPartnerLoginSteps()
    partnerOrderBoardFlow.ts         # DONE — runPartnerOrderBoardSteps()
    driverLoginFlow.ts               # DONE — runDriverLoginSteps()
    driverDeliveryFlow.ts            # DONE — runDriverDeliverySteps()
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

### placeOrderFlow.ts — `runPlaceOrderSteps()` — DONE

- Tap FOODS category on home screen (if visible)
- Tap the second restaurant in the list
- Assert `RestaurantMenuPage` is loaded
- Tap Pizza item
- Assert `ItemDetailPage` is loaded
- Select the first variation
- Select Coke as the drink
- Tap Add to Cart
- Tap the cart button from the menu page
- Assert `CartPage` is loaded
- Tap Continue
- Assert `DriverSelectionPage` is loaded
- Select a driver
- Confirm driver selection
- Assert `CheckoutPage` is loaded
- Tap Place Order
- Dismiss the order created successfully popup

### customerLogoutFlow.ts — `runCustomerLogoutSteps()` — DONE

- Tap the account tab (`Tab 1 of 4`) on the home screen — drawer slides in from the left
- Assert `CustomerDrawerPage` is loaded (Log Out button visible)
- Tap Log Out
- Assert `WelcomePage` is loaded

### partnerLoginFlow.ts — `runPartnerLoginSteps()` — DONE

- Open the partner portal (`PartnerLoginPage.open()`)
- Assert login page is loaded
- Enter email
- Enter password
- Submit and assert dashboard is loaded

### partnerOrderBoardFlow.ts — `runPartnerOrderBoardSteps()` — DONE

- Navigate to `/member/orders`
- Assert Order Board page is loaded (`.dashboard_bar` heading)
- Tap **Ready for Process** on the first order card
- Wait 10 seconds for UI to update
- Tap **Ready for Pickup** on the first order card

### driverLoginFlow.ts — `runDriverLoginSteps()` — DONE

- Assert driver login screen is displayed
- Enter email and password
- Tap login, assert driver home screen is visible

### driverDeliveryFlow.ts — `runDriverDeliverySteps()` — DONE

- Tap the active order on `DriverHomePage` to open order details
- Assert `DriverOrderPage` is loaded
- Slide to start delivery
- Wait 10 seconds, then slide to finish delivery
- Assert "Good job! Order is delivered" popup is visible
- Tap OK to dismiss

---

## New Page Objects — What Each Needs

| Page Object              | Key selectors / methods                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LoginPage`      | email input, password input, login button, `login(email, pw)`, `isLoggedIn()`                                                                     |
| `CustomerHomePage`       | restaurant list, `tapFoodsIfVisible()`, `tapRestaurant(index)`, `tapAccountTab()`                                                                 |
| `CustomerDrawerPage`     | `isLoaded()`, `tapLogOut()`                                                                                                                       |
| `RestaurantMenuPage`     | `isLoaded()`, `tapPizza()`, `tapCartButton()`                                                                                                     |
| `ItemDetailPage`         | `isLoaded()`, `selectFirstVariation()`, `selectCoke()`, `tapAddToCart()`                                                                          |
| `CartPage`               | `isLoaded()`, `tapContinue()`                                                                                                                     |
| `DriverSelectionPage`    | `isLoaded()`, `selectDriver()`, `tapConfirm()`                                                                                                    |
| `CheckoutPage`           | `isLoaded()`, `tapPlaceOrder()`, `tapOk()`                                                                                                        |
| `DriverLoginPage`        | email, password, submit, `login()`, `isLoggedIn()`                                                                                                |
| `DriverHomePage`         | active order list, `tapOrder()`                                                                                                                   |
| `DriverOrderPage`        | order details, slide-to-start, slide-to-finish, success popup, `slideToStartDelivery()`, `slideToFinishDelivery()`, `isDeliverySuccessVisible()`, `tapOk()` |
| `PartnerOrdersPage`      | `isLoaded()`, `open()`, `tapReadyForProcess()`, `tapReadyForPickup()`                                                                             |

---

## package.json Script

```json
"test:order": "wdio run config/wdio.android.conf.ts --spec src/tests/order-flow/orderFlow.test.ts && wdio run config/wdio.web.conf.ts --spec src/tests/web/order-flow/partnerOrderFlow.test.ts && wdio run config/wdio.android.conf.ts --spec src/tests/order-flow/driverOrderFlow.test.ts"
```

---

## Data / Credentials Needed

Before implementation, confirm:

- [x] Customer app credentials — in `customerData.ts`
- [x] Partner portal credentials — `jubu700@gmail.com` in `partnerData.ts` (`qaOrderPartner`)
- [x] Driver app credentials — in `driverData.ts`
- [x] Driver app confirmed — separate role, same APK with `qaDriver` credentials

---

## Status

**All tasks complete.** The full order flow E2E test is implemented across all three sessions:

- [x] Customer Android session — login, place order, logout
- [x] Partner Chrome session — login, accept order (ready for process → ready for pickup)
- [x] Driver Android session — login, pickup, deliver, logout
