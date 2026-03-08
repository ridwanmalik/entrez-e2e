# entrez-e2e

WebdriverIO v8 + Appium (Android) + Chrome (web). Use Yarn.

## Always use these helpers (`@/helpers/utils`)
- `second(n)` — ms converter. Use `second(3)` never `3000`
- `minute(n)` — ms converter. Use `minute(2)` never `120000`
- `generatePhoneNumber()` → `358XXXXXXXX` (Android app)
- `generateUniqueEmail()`, `generateFinnishAddress()`

## Android App
- **Entry point is `WelcomePage`** — every Android test flow starts there, not on the login screen
- From `WelcomePage`, tap Login to reach `LoginPage`, or tap Create Account to reach `RegistrationPage`

## Partner Portal (web)
- Server sleeps — `open()` retries until `div.join-courier` appears
- Always add an `after` hook to every web test:
  ```ts
  after(async () => {
    await browser.pause(second(10))
  })
  ```

## Run
- `yarn test:android` / `yarn test:web:partner` / `yarn report`
