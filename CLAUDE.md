# entrez-e2e

WebdriverIO v8 + Appium (Android) + Chrome (web). Use Yarn.

## Always use these helpers (`@/helpers/utils`)
- `second(n)` — ms converter. Use `second(3)` never `3000`
- `generatePhoneNumber()` → `358XXXXXXXX` (Android app)
- `generateUniqueEmail()`, `generateFinnishAddress()`

## Partner Portal (web)
- Server sleeps — `open()` retries until `div.join-courier` appears

## Run
- `yarn test:android` / `yarn test:web:partner` / `yarn report`
