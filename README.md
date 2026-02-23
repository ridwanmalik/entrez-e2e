# entrez-e2e

End-to-end mobile automation suite for the Entrez food delivery app — Android only.

Built with **WebdriverIO v8 + Appium v3 + UiAutomator2**, written in **TypeScript**.

---

## Stack

| Tool | Version | Purpose |
|------|---------|---------|
| WebdriverIO | v8 | Test runner & browser/device API |
| Appium | v3 | Mobile automation server |
| UiAutomator2 | v7 | Android driver |
| Mocha | — | Test framework (BDD) |
| Allure | v2 | Test reporting |
| TypeScript | v5 | Language |
| Faker.js | v10 | Random test data |
| Moment.js | v2 | Date formatting |

---

## Project Structure

```
entrez-e2e/
├── config/
│   ├── wdio.conf.ts              # Base WDIO config (Appium service, Mocha, Allure)
│   └── wdio.android.conf.ts      # Android capabilities (UiAutomator2)
├── src/
│   ├── data/
│   │   └── testData.ts           # UserData interface, Role enum, validUser() factory
│   ├── helpers/
│   │   ├── utils.ts              # Generators: email, phone, Finnish address, retry
│   │   └── registrationFlow.ts   # Shared Steps 1–3 (reused by both test files)
│   ├── pageObjects/
│   │   ├── base/
│   │   │   └── BasePage.ts       # tap, setField, scroll, screenshot, looseFocus
│   │   ├── WelcomePage.ts        # Welcome / Login screen
│   │   └── RegistrationPage.ts   # All 5–6 registration step selectors & actions
│   └── tests/
│       └── registration/
│           ├── clientRegistration.test.ts   # Client (customer) happy path
│           └── serviceRegistration.test.ts  # Service provider (driver) happy path
├── apps/                         # Drop APK here (git-ignored, .gitkeep tracked)
├── reports/
│   ├── allure-results/           # Raw Allure output
│   ├── allure-report/            # Generated HTML report
│   └── screenshots/              # Failure screenshots (auto-captured)
├── .env.example                  # Environment variable template
└── .github/
    └── workflows/
        └── e2e-android.yml       # GitHub Actions CI (API 33 emulator)
```

---

## Prerequisites

- **Node.js** ≥ 18
- **Yarn**
- **Android SDK** with `adb` on PATH
- **Java 17** (required by UiAutomator2 server)
- Real device connected via USB **or** an Android emulator running

---

## Setup

### 1. Install dependencies

```bash
yarn install
```

### 2. Install the UiAutomator2 driver

```bash
yarn setup:driver
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your device details:

```env
# Run `adb devices` to get your UDID
ANDROID_UDID=your_device_udid
ANDROID_DEVICE_NAME=My Android Device
ANDROID_PLATFORM_VERSION=13.0

# App already installed on device — leave APP_PATH empty
APP_PACKAGE=com.pounce.ssds.dev
APP_ACTIVITY=com.pounce.ssds.MainActivity

# Appium server (managed automatically by WDIO)
APPIUM_HOST=localhost
APPIUM_PORT=4723

# Element wait timeout (ms) — increase for slow devices
EXPLICIT_WAIT_MS=30000
```

> **No APK needed** if the app is already installed. Leave `APP_PATH` unset and the suite will connect directly to the running app.

---

## Running Tests

```bash
# All specs
yarn test:android

# Client (customer) registration only
yarn test:android:client

# Service (driver) registration only
yarn test:android:service

# CI mode (reduced log output)
yarn test:android:ci
```

---

## Test Coverage

### Client Registration (`clientRegistration.test.ts`)

| Step | Description |
|------|-------------|
| Step 1 | Personal details — role (Client), name, phone, email, date of birth |
| Step 2 | PIN — enter & confirm |
| Step 3 | Address — street, city, postal code (Finnish addresses only) |
| Step 4 | Card info — pre-filled test card, tap Next |
| Step 5 | Submit — tap Create Account, assert success dialog, dismiss |

### Service Registration (`serviceRegistration.test.ts`)

| Step | Description |
|------|-------------|
| Step 1 | Personal details — role (Service), name, phone, email, date of birth |
| Step 2 | PIN — enter & confirm |
| Step 3 | Address — street, city, postal code (Finnish addresses only) |
| Step 4 | Bank account — enter Finnish IBAN |
| Step 5 | Pricing per kilometre — pre-filled, tap Next |
| Step 6 | Submit — tap Create Account, assert success dialog, dismiss |

Steps 1–3 are shared between both flows via `runSharedRegistrationSteps()`.

---

## Test Data

All data is randomly generated per run:

| Field | Generator |
|-------|-----------|
| First / Last name | `faker.person.firstName/lastName()` |
| Email | `qa[HHmmss]@example.com` |
| Phone | Finnish format: `358[40–50][7 digits]` |
| Date of birth | Random, age 18–60, formatted `DD/MM/YYYY` |
| Address | Random pick from curated Finnish address pool |
| PIN | Fixed: `Test7@` |
| IBAN (service) | `faker.finance.iban({ countryCode: 'FI' })` |

---

## Reports

```bash
# Generate + open Allure HTML report
yarn report

# Generate only
yarn report:generate

# Open previously generated report
yarn report:open
```

Failure screenshots are saved automatically to `reports/screenshots/` with a timestamp suffix.

---

## CI / GitHub Actions

The pipeline (`.github/workflows/e2e-android.yml`) runs on:
- Push to `main` or `develop`
- Pull request to `main`
- Manual trigger (`workflow_dispatch`)

**Required secrets:**

| Secret | Description |
|--------|-------------|
| `APK_DOWNLOAD_URL` | URL to download the debug APK |
| `APP_PACKAGE` | e.g. `com.pounce.ssds.dev` |
| `APP_ACTIVITY` | e.g. `com.pounce.ssds.MainActivity` |

**Artifacts uploaded on each run:**
- Allure results (14-day retention)
- Failure screenshots (7-day retention, failures only)
- Appium server log (7-day retention, failures only)

**Real device CI:** replace `runs-on: macos-latest` with `runs-on: [self-hosted, android]` and skip the emulator step.

---

## Useful Commands

```bash
yarn typecheck          # TypeScript type-check (no emit)
yarn appium:doctor      # Check Android environment setup
yarn check:drivers      # List installed Appium drivers
yarn setup:driver       # Install UiAutomator2 driver
```

---

## Notes

- The app is a **Flutter** app — standard `setValue()` doesn't work. All text input uses Appium's `mobile: type` command which types into the currently focused element.
- The date of birth picker is a **drum picker** (SeekBar-based), not a text field. It is automated via swipe gestures.
- Some fields use **fallback selectors** (try/catch) because Flutter rebuilds the scroll view when the keyboard opens, which changes `instance()` indices.
- `forceAppLaunch: true` is set so every session starts fresh from the main activity regardless of previous app state.
