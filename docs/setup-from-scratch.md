# Building This Project From Scratch (Windows)

This guide walks through creating this exact project from an empty folder on a new Windows machine — no git clone, no existing code. By the end you will have a working Android E2E test suite using WebdriverIO + Appium + TypeScript.

---

## Part 1 — Install System Dependencies

### 1.1 — Install Chocolatey (Windows Package Manager)

Chocolatey lets you install dev tools from the command line. Open **PowerShell as Administrator** and run:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Close and reopen PowerShell as Administrator, then verify:
```powershell
choco --version
```

---

### 1.2 — Install Node.js and Java with Chocolatey

In **PowerShell as Administrator**, run:

```powershell
choco install -y nodejs-lts microsoft-openjdk17
```

This installs:
- **Node.js LTS** — also sets up `npm` automatically
- **Microsoft OpenJDK 17** — also sets `JAVA_HOME` automatically

Close and reopen your terminal, then verify:
```cmd
node --version
java -version
echo %JAVA_HOME%
```

Then install Yarn globally:
```cmd
npm install -g yarn
yarn --version
```

---

### 1.3 — Install Android Studio and SDK

1. Download Android Studio from https://developer.android.com/studio and run the installer
2. Complete the **Setup Wizard** — it downloads the Android SDK automatically
3. Once open, go to **Tools → SDK Manager**:

   **SDK Platforms tab** — check:
   - Android 13.0 (API 33)

   **SDK Tools tab** — check:
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android Emulator
   - Intel x86 Emulator Accelerator (HAXM) — Intel CPUs only

4. Note the **Android SDK Location** at the top (e.g. `C:\Users\YourName\AppData\Local\Android\Sdk`)

5. Set environment variables (same way as JAVA_HOME above):

   **New System variable:**
   - Name: `ANDROID_HOME`
   - Value: your SDK path from above

   **Edit Path, add these entries:**
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\emulator
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin
   ```

6. Restart your terminal, then verify:
```cmd
adb version
```

---

### 1.4 — Install Allure CLI (for reports)

Install Scoop (a Windows package manager), then use it to install Allure. Run in **PowerShell**:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
scoop install allure
```

Verify:
```cmd
allure --version
```

---

### 1.5 — Enable Hardware Virtualization (for Emulator)

The Android emulator requires hardware acceleration:

1. Restart your PC and enter BIOS/UEFI
2. Find **Intel VT-x** or **AMD-V / SVM Mode** and enable it
3. Save and reboot

Then in Windows:
- Press `Win + S` → **"Turn Windows features on or off"**
- Check **Hyper-V** (all sub-items) and **Virtual Machine Platform**
- Click OK and restart

---

## Part 2 — Set Up Your Android Device

### Option A — Android Emulator

1. In Android Studio → **Tools → Device Manager** → **Create Virtual Device**
2. Select **Pixel 6** → Next
3. Select system image: **API 33, x86_64** (download if needed) → Next → Finish

Start it from the terminal:
```cmd
emulator -avd Pixel_6_API_33
```

Wait for the home screen to appear, then verify:
```cmd
adb devices
:: Should show: emulator-5554   device
```

### Option B — Real Physical Device

1. On the phone: **Settings → About Phone** → tap **Build Number** 7 times
2. **Settings → Developer Options**:
   - Enable **USB Debugging**
3. Connect via USB cable and accept the prompt on the phone
4. Verify:
```cmd
adb devices
:: Should show: ABC123DEF456   device
```

Note the UDID — you will need it later.

---

## Part 3 — Create the Project

### 3.1 — Create the Folder Structure

Open Command Prompt:
```cmd
mkdir my-e2e-project
cd my-e2e-project

mkdir config
mkdir apps
mkdir src\data
mkdir src\helpers
mkdir src\pageObjects\base
mkdir src\tests\registration
mkdir reports\screenshots
mkdir docs
```

Create placeholder files to preserve empty folders in git:
```cmd
type nul > apps\.gitkeep
type nul > reports\screenshots\.gitkeep
```

---

### 3.2 — Initialize the Project

```cmd
yarn init -y
```

---

### 3.3 — Install All Dependencies

```cmd
yarn add -D ^
  @wdio/cli@^8.41.0 ^
  @wdio/local-runner@^8.41.0 ^
  @wdio/mocha-framework@^8.41.0 ^
  @wdio/spec-reporter@^8.41.0 ^
  @wdio/allure-reporter@^8.41.0 ^
  @wdio/appium-service@^8.41.0 ^
  appium@^3.0.0 ^
  appium-uiautomator2-driver@^7.0.0 ^
  @faker-js/faker@^10.3.0 ^
  typescript@^5.9.3 ^
  ts-node@^10.9.2 ^
  tsconfig-paths@^4.2.0 ^
  @types/node@^25.3.0 ^
  @types/mocha@^10.0.10 ^
  allure-commandline@^2.31.0 ^
  dotenv@^16.4.0

yarn add moment@^2.30.1
```

---

### 3.4 — Install the Appium UiAutomator2 Driver

```cmd
npx appium driver install uiautomator2
```

Verify:
```cmd
npx appium driver list --installed
```

---

## Part 4 — Create Config Files

### 4.1 — `package.json` scripts

Open `package.json` and replace the `"scripts"` section with:

```json
"scripts": {
  "test:android": "wdio run config/wdio.android.conf.ts",
  "test:android:client": "wdio run config/wdio.android.conf.ts --spec src/tests/registration/clientRegistration.test.ts",
  "test:android:service": "wdio run config/wdio.android.conf.ts --spec src/tests/registration/serviceRegistration.test.ts",
  "test:android:ci": "wdio run config/wdio.android.conf.ts --logLevel warn",
  "report:generate": "allure generate reports/allure-results --clean -o reports/allure-report",
  "report:open": "allure open reports/allure-report",
  "report": "yarn report:generate && yarn report:open",
  "setup:driver": "appium driver install uiautomator2",
  "check:drivers": "appium driver list --installed",
  "appium:doctor": "appium-doctor --android",
  "typecheck": "tsc --noEmit"
}
```

Also add a Node.js engine requirement alongside `"scripts"`:
```json
"engines": {
  "node": ">=18.0.0"
}
```

---

### 4.2 — `tsconfig.json`

Create `tsconfig.json` at the project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "lib": ["ES2020"],
    "strict": false,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "outDir": ".tsbuild",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["node", "mocha", "@wdio/globals/types"]
  },
  "include": ["src/**/*.ts", "config/**/*.ts"],
  "exclude": ["node_modules", ".tsbuild"]
}
```

> The `@/*` path alias lets you import with `@/pageObjects/...` instead of long relative paths.

---

### 4.3 — `config/wdio.conf.ts` (base config)

```typescript
import path from 'path';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

export const config: WebdriverIO.Config = {
  runner: 'local',

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: path.join(__dirname, '../tsconfig.json'),
      transpileOnly: true,
      require: ['tsconfig-paths/register'],
    } as any,
  },

  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT || '4723', 10),
  path: '/',

  specs: [path.join(__dirname, '../src/tests/**/*.test.ts')],
  exclude: [],

  maxInstances: 1,
  capabilities: [],

  logLevel: 'warn',
  bail: 0,

  waitforTimeout: parseInt(process.env.EXPLICIT_WAIT_MS || '30000', 10),
  connectionRetryTimeout: 180000,
  connectionRetryCount: 3,

  services: [
    [
      'appium',
      {
        command: path.resolve(__dirname, '../node_modules/.bin/appium'),
        args: {
          relaxedSecurity: true,
          log: './appium.log',
          logLevel: 'info:debug',
        },
      },
    ],
  ],

  framework: 'mocha',

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'reports/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    require: [require.resolve('tsconfig-paths/register')],
  },

  afterTest: async (test, _context, { error }) => {
    if (error) {
      const safeName = test.title.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
      const timestamp = moment().format('YYYYMMDD_HHmmss');
      const screenshotPath = `reports/screenshots/${safeName}_${timestamp}.png`;
      try {
        await driver.saveScreenshot(screenshotPath);
        console.info(`[WDIO] Failure screenshot saved → ${screenshotPath}`);
      } catch (screenshotErr: any) {
        console.warn('[WDIO] Could not capture failure screenshot:', screenshotErr.message);
      }
    }
  },
};
```

---

### 4.4 — `config/wdio.android.conf.ts` (Android capabilities)

```typescript
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import { config } from './wdio.conf';

config.capabilities = [
  {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',

    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Device',
    'appium:udid': process.env.ANDROID_UDID || undefined,
    'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '',

    ...(process.env.APP_PATH ? { 'appium:app': path.resolve(process.env.APP_PATH) } : {}),
    'appium:appPackage': process.env.APP_PACKAGE || 'com.yourapp.package',
    'appium:appActivity': process.env.APP_ACTIVITY || '.MainActivity',

    'appium:noReset': !process.env.APP_PATH,
    'appium:fullReset': false,
    'appium:forceAppLaunch': true,
    'appium:newCommandTimeout': 240,

    'appium:autoGrantPermissions': true,
    'appium:disableWindowAnimation': true,

    'appium:uiautomator2ServerLaunchTimeout': 60000,
    'appium:uiautomator2ServerInstallTimeout': 60000,

    'appium:ignoreHiddenApiPolicyError': true,
  },
];

export { config };
```

---

### 4.5 — `.env.example`

```env
# ─── Android device ──────────────────────────────────────────────────────────
# Run `adb devices` to get the UDID
ANDROID_DEVICE_NAME=My Android Device
ANDROID_UDID=
ANDROID_PLATFORM_VERSION=13.0

# ─── App under test ──────────────────────────────────────────────────────────
# Set APP_PATH to install APK each session. Remove it if already installed.
APP_PATH=./apps/app-debug.apk
APP_PACKAGE=com.yourcompany.yourapp
APP_ACTIVITY=.MainActivity

# ─── Appium server ───────────────────────────────────────────────────────────
APPIUM_HOST=localhost
APPIUM_PORT=4723

# ─── Timeouts (ms) ───────────────────────────────────────────────────────────
EXPLICIT_WAIT_MS=30000
```

Then copy it to create your actual config:
```cmd
copy .env.example .env
```

Edit `.env` with your real device UDID, app package name, etc.

---

### 4.6 — `.gitignore`

```
node_modules/

# Allure output
reports/allure-results/
reports/allure-report/

# Failure screenshots
reports/screenshots/*.png

# APKs — never commit binaries
apps/*.apk
apps/*.ipa

# Env secrets
.env

# Appium log
appium.log
*.log

# OS junk
Thumbs.db
```

---

## Part 5 — Write the Source Code

### 5.1 — `src/pageObjects/base/BasePage.ts`

The base class that all page objects extend. Contains all reusable Appium interaction methods.

```typescript
import moment from 'moment';

const DEFAULT_TIMEOUT = parseInt(process.env.EXPLICIT_WAIT_MS || '30000', 10);

export class BasePage {
  async waitForElement(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<WebdriverIO.Element> {
    const element = await $(selector);
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: `[BasePage] Element "${selector}" not visible after ${timeout}ms`,
    });
    return element;
  }

  async waitForElementExist(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<WebdriverIO.Element> {
    const element = await $(selector);
    await element.waitForExist({
      timeout,
      timeoutMsg: `[BasePage] Element "${selector}" not in DOM after ${timeout}ms`,
    });
    return element;
  }

  async tap(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
    const element = await this.waitForElement(selector, timeout);
    await element.click();
  }

  async setField(selector: string, value: string, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
    const element = await this.waitForElement(selector, timeout);
    await element.click();
    await driver.execute('mobile: type', { text: String(value) });
  }

  async looseFocus(): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    await driver.execute('mobile: clickGesture', {
      x: Math.floor(width / 2),
      y: Math.floor(height * 0.05),
    });
  }

  async getText(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<string> {
    const element = await this.waitForElement(selector, timeout);
    return element.getText();
  }

  async isDisplayed(selector: string, timeout: number = DEFAULT_TIMEOUT): Promise<boolean> {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async scrollDown(percent: number = 1.0): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    await driver.execute('mobile: scrollGesture', {
      left: 0,
      top: Math.round(height * 0.25),
      width,
      height: Math.round(height * 0.5),
      direction: 'down',
      percent,
    });
  }

  async scrollUp(percent: number = 1.0): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    await driver.execute('mobile: scrollGesture', {
      left: 0,
      top: Math.round(height * 0.25),
      width,
      height: Math.round(height * 0.5),
      direction: 'up',
      percent,
    });
  }

  async waitForLoaderToDisappear(
    loaderSelector: string = '~loading_indicator',
    timeout: number = DEFAULT_TIMEOUT
  ): Promise<void> {
    try {
      const loader = await $(loaderSelector);
      await loader.waitForDisplayed({ timeout: 3000 });
      await loader.waitForDisplayed({
        timeout,
        reverse: true,
        timeoutMsg: `[BasePage] Loader "${loaderSelector}" still visible after ${timeout}ms`,
      });
    } catch {
      // Loader did not appear or already gone — continue
    }
  }

  async takeScreenshot(name: string): Promise<string> {
    const safeName = name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
    const filePath = `reports/screenshots/${safeName}_${moment().format('YYYYMMDD_HHmmss')}.png`;
    await driver.saveScreenshot(filePath);
    return filePath;
  }
}
```

---

### 5.2 — `src/pageObjects/WelcomePage.ts`

```typescript
import { BasePage } from './base/BasePage';

class WelcomePage extends BasePage {
  get createAccountButton(): string {
    return '//android.widget.Button[@content-desc="CREATE ACCOUNT"]';
  }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.createAccountButton, 20000);
  }

  async tapCreateAccount(): Promise<void> {
    await this.tap(this.createAccountButton);
  }
}

export default new WelcomePage();
```

> **Selector note:** `content-desc` values come from the Flutter app's `Semantics(label: '...')` annotations. Use `adb shell uiautomator dump` or Android Studio's Layout Inspector to find the right values for your app.

---

### 5.3 — `src/pageObjects/RegistrationPage.ts`

Adapt selectors to match your app's actual UI. The ones below match the current app under test.

```typescript
import { Role } from '@/data/testData';
import { second } from '@/helpers/utils';
import moment from 'moment';
import { BasePage } from './base/BasePage';

class RegistrationPage extends BasePage {
  get screenTitle(): string { return '~CREATE ACCOUNT'; }
  get clientRole(): string { return '//android.widget.ImageView[@content-desc="Client"]'; }
  get serviceRole(): string { return '//android.widget.ImageView[@content-desc="Service"]'; }
  get firstNameInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(0)'; }
  get lastNameInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(1)'; }
  get phoneInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(2)'; }
  get emailInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(3)'; }
  get emailInScrollView(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(1)'; }
  get pinInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(0)'; }
  get confirmPinInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(1)'; }
  get confirmPinInputInScrollView(): string { return 'android=new UiSelector().className("android.widget.EditText")'; }
  get streetInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(0)'; }
  get additionalAddressInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(1)'; }
  get additionalAddressInputInScrollView(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(0)'; }
  get cityInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(2)'; }
  get postalCodeInput(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(3)'; }
  get postalCodeInputInScrollView(): string { return 'android=new UiSelector().className("android.widget.EditText").instance(0)'; }
  get dateOfBirthTrigger(): string { return 'android=new UiSelector().className("android.view.View").instance(17)'; }
  get datePickerDay(): string { return 'android=new UiSelector().className("android.widget.SeekBar").instance(0)'; }
  get datePickerMonth(): string { return 'android=new UiSelector().className("android.widget.SeekBar").instance(1)'; }
  get datePickerYear(): string { return 'android=new UiSelector().className("android.widget.SeekBar").instance(2)'; }
  get datePickerOk(): string { return '~OK'; }
  get nextButton(): string { return '(//android.widget.ImageView[@clickable="true" and not(@content-desc)])[last()]'; }
  get accountNumberInput(): string { return 'android=new UiSelector().className("android.widget.EditText")'; }
  get createAccountButton(): string { return '//android.widget.Button[@content-desc="Create Account"]'; }
  get registrationSuccessDialog(): string { return '//android.view.View[@content-desc="Registration Successful"]'; }
  get okButton(): string { return '//android.widget.Button[@content-desc="OK"]'; }
  get prevButton(): string { return '(//android.widget.ImageView[@clickable="true" and not(@content-desc)])[1]'; }

  async isLoaded(): Promise<boolean> {
    return this.isDisplayed(this.clientRole, 15000);
  }

  async looseFocusFormPhone(): Promise<void> {
    await this.tap(this.emailInput);
  }

  async selectRole(role: Role = Role.Client): Promise<void> {
    await this.tap(role === Role.Client ? this.clientRole : this.serviceRole);
  }

  async enterFirstName(name: string): Promise<void> { await this.setField(this.firstNameInput, name); }
  async enterLastName(name: string): Promise<void> { await this.setField(this.lastNameInput, name); }
  async enterPhone(phone: string): Promise<void> { await this.setField(this.phoneInput, phone); }

  async enterEmail(email: string): Promise<void> {
    try {
      await this.setField(this.emailInput, email, second(1));
    } catch {
      await this.setField(this.emailInScrollView, email);
    }
  }

  async enterDateOfBirth(dateStr: string): Promise<void> {
    await this.tap(this.dateOfBirthTrigger);
    const date = moment(dateStr, 'DD/MM/YYYY');
    const day = date.date();
    const month = date.month() + 1;
    const year = date.year();
    const curDay = parseInt(await $(this.datePickerDay).getAttribute('content-desc'));
    const curMonth = moment().month(await $(this.datePickerMonth).getAttribute('content-desc')).month() + 1;
    const curYear = parseInt(await $(this.datePickerYear).getAttribute('content-desc'));
    await this._scrollPickerTo(this.datePickerYear, curYear, year);
    await this._scrollPickerTo(this.datePickerMonth, curMonth, month);
    await this._scrollPickerTo(this.datePickerDay, curDay, day);
    await this.tap(this.datePickerOk);
  }

  async _scrollPickerTo(selector: string, from: number, to: number): Promise<void> {
    if (from === to) return;
    const el = await $(selector);
    const { x, y } = await el.getLocation();
    const { width, height } = await el.getSize();
    const direction = to > from ? 'up' : 'down';
    const steps = Math.abs(to - from);
    for (let i = 0; i < steps; i++) {
      await driver.execute('mobile: swipeGesture', { left: x, top: y, width, height: height - 2, direction, percent: 0.3 });
      await driver.pause(100);
    }
  }

  async enterPin(pin: string): Promise<void> { await this.setField(this.pinInput, pin); }

  async confirmPin(pin: string): Promise<void> {
    try {
      await this.setField(this.confirmPinInput, pin, second(1));
    } catch {
      await this.setField(this.confirmPinInputInScrollView, pin);
    }
  }

  async enterStreet(street: string): Promise<void> { await this.setField(this.streetInput, street); }

  async enterAdditionalAddress(additional: string): Promise<void> {
    try {
      await this.setField(this.additionalAddressInput, additional, second(1));
    } catch {
      await this.setField(this.additionalAddressInputInScrollView, additional);
    }
  }

  async enterCity(city: string): Promise<void> { await this.setField(this.cityInput, city); }

  async enterPostalCode(postalCode: string): Promise<void> {
    try {
      await this.setField(this.postalCodeInput, postalCode, second(1));
    } catch {
      await this.setField(this.postalCodeInputInScrollView, postalCode);
    }
  }

  async tapNext(): Promise<void> { await this.tap(this.nextButton); }
  async enterAccountNumber(accountNumber: string): Promise<void> { await this.setField(this.accountNumberInput, accountNumber); }
  async tapCreateAccount(): Promise<void> { await this.tap(this.createAccountButton); }
}

export default new RegistrationPage();
```

---

### 5.4 — `src/helpers/utils.ts`

```typescript
import moment from 'moment';

export interface FinnishAddress {
  street: string;
  city: string;
  postalCode: string;
}

const FINNISH_ADDRESSES: FinnishAddress[] = [
  { street: 'Kolmas linja 17', city: 'Helsinki', postalCode: '00530' },
  { street: 'Kolmas linja 18', city: 'Helsinki', postalCode: '00530' },
  { street: 'Kalervonkatu 5',  city: 'Helsinki', postalCode: '00610' },
  { street: 'Harjutori 8',     city: 'Helsinki', postalCode: '00500' },
  { street: 'Ostostie 4',      city: 'Helsinki', postalCode: '00940' },
  { street: 'Aurakatu 6',      city: 'Turku',    postalCode: '20100' },
  { street: 'Yliopistonkatu 22', city: 'Turku',  postalCode: '20100' },
];

export const generateFinnishAddress = (): FinnishAddress =>
  FINNISH_ADDRESSES[Math.floor(Math.random() * FINNISH_ADDRESSES.length)];

export const generateUniqueEmail = (): string => {
  const ts = moment().format('HHmmss');
  return `qa${ts}@example.com`;
};

export const generatePhoneNumber = (): string => {
  const mid = Math.floor(Math.random() * 11) + 40;
  const suffix = Math.floor(Math.random() * 9000000) + 1000000;
  return `358${mid}${suffix}`;
};

export const pause = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const retry = async <T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      if (attempt === retries) throw err;
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[retry] Attempt ${attempt}/${retries} failed: ${message}. Retrying in ${delayMs}ms…`);
      await pause(delayMs);
    }
  }
  throw new Error('retry: exhausted retries');
};

export const second = (s: number): number => s * 1000;
```

---

### 5.5 — `src/data/testData.ts`

```typescript
import { generateFinnishAddress, generatePhoneNumber, generateUniqueEmail } from '@/helpers/utils';
import { faker } from '@faker-js/faker';
import moment from 'moment';

export enum Role {
  Client = 'Client',
  Service = 'Service',
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  role: Role;
  pin: string;
  accountNumber: string;
  street: string;
  additionalAddress: string;
  city: string;
  postalCode: string;
}

export const validUser = (role: Role = Role.Client): UserData => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: generateUniqueEmail(),
  phone: generatePhoneNumber(),
  dateOfBirth: moment(faker.date.birthdate({ min: 18, max: 60, mode: 'age' })).format('DD/MM/YYYY'),
  role,
  pin: 'Test7@',
  accountNumber: faker.finance.iban({ countryCode: 'FI' }),
  ...generateFinnishAddress(),
  additionalAddress: '',
});

export const invalidUsers: Record<string, UserData> = {
  emptyEmail: {
    firstName: 'Test',
    lastName: 'User',
    email: '',
    phone: '+15551234567',
    dateOfBirth: '01/01/1990',
    role: Role.Client,
    pin: 'Test7@',
    accountNumber: 'FI0000000000000000',
    street: '123 Test St',
    additionalAddress: '',
    city: 'Testville',
    postalCode: '00100',
  },
  invalidEmailFormat: {
    firstName: 'Test',
    lastName: 'User',
    email: 'not-a-valid-email',
    phone: '+15551234567',
    dateOfBirth: '01/01/1990',
    role: Role.Client,
    pin: 'Test7@',
    accountNumber: 'FI0000000000000000',
    street: '123 Test St',
    additionalAddress: '',
    city: 'Testville',
    postalCode: '00100',
  },
};
```

---

### 5.6 — `src/helpers/registrationFlow.ts`

Shared steps reused by both client and service test files.

```typescript
import { UserData } from '@/data/testData';
import { second } from '@/helpers/utils';
import RegistrationPage from '@/pageObjects/RegistrationPage';
import WelcomePage from '@/pageObjects/WelcomePage';

export const runSharedRegistrationSteps = (user: UserData) => {
  describe('Step 1 — Personal Details', () => {
    it('should display the Welcome page on app launch', async () => {
      expect(await WelcomePage.isLoaded()).toBe(true);
    });

    it('should navigate to Registration when Create Account is tapped', async () => {
      await WelcomePage.tapCreateAccount();
      expect(await RegistrationPage.isLoaded()).toBe(true);
    });

    it('should select a role, fill all fields, and proceed to Step 2', async () => {
      await RegistrationPage.selectRole(user.role);
      await RegistrationPage.enterFirstName(user.firstName);
      await RegistrationPage.enterLastName(user.lastName);
      await RegistrationPage.enterPhone(user.phone);
      await RegistrationPage.looseFocusFormPhone();
      await driver.pause(second(3));
      await RegistrationPage.enterEmail(user.email);
      await RegistrationPage.enterDateOfBirth(user.dateOfBirth);
      await RegistrationPage.tapNext();
    });
  });

  describe('Step 2 — PIN', () => {
    it('should enter and confirm PIN then proceed to Step 3', async () => {
      await RegistrationPage.enterPin(user.pin);
      await driver.pause(second(3));
      await RegistrationPage.confirmPin(user.pin);
      await RegistrationPage.tapNext();
    });
  });

  describe('Step 3 — Address', () => {
    it('should fill address fields and proceed to Step 4', async () => {
      await RegistrationPage.enterStreet(user.street);
      await RegistrationPage.enterCity(user.city);
      await RegistrationPage.enterPostalCode(user.postalCode);
      await RegistrationPage.tapNext();
    });
  });
};
```

---

### 5.7 — `src/tests/registration/clientRegistration.test.ts`

```typescript
import { Role, validUser } from '@/data/testData';
import { runSharedRegistrationSteps } from '@/helpers/registrationFlow';
import RegistrationPage from '@/pageObjects/RegistrationPage';

describe('Client Registration', () => {
  const user = validUser(Role.Client);

  runSharedRegistrationSteps(user);

  describe('Step 4 — Card Info', () => {
    it('should proceed with pre-filled test card info', async () => {
      await RegistrationPage.tapNext();
    });
  });

  describe('Step 5 — Submit', () => {
    it('should tap Create Account, see success dialog, and dismiss it', async () => {
      await RegistrationPage.tapCreateAccount();
      expect(await RegistrationPage.isDisplayed(RegistrationPage.registrationSuccessDialog, 30000)).toBe(true);
      await RegistrationPage.tap(RegistrationPage.okButton);
    });
  });
});
```

---

### 5.8 — `src/tests/registration/serviceRegistration.test.ts`

```typescript
import { Role, validUser } from '@/data/testData';
import { runSharedRegistrationSteps } from '@/helpers/registrationFlow';
import RegistrationPage from '@/pageObjects/RegistrationPage';

describe('Service Registration', () => {
  const user = validUser(Role.Service);

  runSharedRegistrationSteps(user);

  describe('Step 4 — Bank Account', () => {
    it('should enter account number and proceed to Step 5', async () => {
      await RegistrationPage.enterAccountNumber(user.accountNumber);
      await RegistrationPage.tapNext();
    });
  });

  describe('Step 5 — Pricing per Kilometre', () => {
    it('should proceed with pre-filled pricing', async () => {
      await RegistrationPage.tapNext();
    });
  });

  describe('Step 6 — Submit', () => {
    it('should tap Create Account, see success dialog, and dismiss it', async () => {
      await RegistrationPage.tapCreateAccount();
      expect(await RegistrationPage.isDisplayed(RegistrationPage.registrationSuccessDialog, 30000)).toBe(true);
      await RegistrationPage.tap(RegistrationPage.okButton);
    });
  });
});
```

---

## Part 6 — Final Checks Before Running

### Type check
```cmd
yarn typecheck
```
No output = no errors.

### Verify Appium setup
```cmd
yarn appium:doctor
```
All `[✓]` items must pass. Fix anything marked `[✗]`.

### Run Appium doctor for Android specifically
```cmd
npx appium-doctor --android
```

---

## Part 7 — Run the Tests

Make sure your emulator is running or real device is connected:

```cmd
adb devices
:: Should show your device with status "device"
```

Then run:
```cmd
yarn test:android
```

To run a single suite:
```cmd
yarn test:android:client
yarn test:android:service
```

---

## Part 8 — View the Allure Report

```cmd
yarn report
```

This generates and opens the HTML report in your browser. Failure screenshots are saved automatically to `reports\screenshots\`.

---

## Final Folder Structure

```
my-e2e-project\
├── config\
│   ├── wdio.conf.ts
│   └── wdio.android.conf.ts
├── src\
│   ├── data\
│   │   └── testData.ts
│   ├── helpers\
│   │   ├── utils.ts
│   │   └── registrationFlow.ts
│   ├── pageObjects\
│   │   ├── base\
│   │   │   └── BasePage.ts
│   │   ├── WelcomePage.ts
│   │   └── RegistrationPage.ts
│   └── tests\
│       └── registration\
│           ├── clientRegistration.test.ts
│           └── serviceRegistration.test.ts
├── apps\
│   └── .gitkeep
├── reports\
│   └── screenshots\
│       └── .gitkeep
├── docs\
│   └── setup-from-scratch.md
├── .env               ← your local config, never commit
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## Troubleshooting

**`adb` not recognized**
→ `%ANDROID_HOME%\platform-tools` is missing from `Path`. Re-do Part 1.3 and restart your terminal.

**`java` not recognized**
→ `%JAVA_HOME%\bin` is missing from `Path`. Re-do Part 1.2.

**Emulator won't start**
→ Virtualization is not enabled. Follow Part 1.5 (BIOS + Hyper-V).

**`yarn setup:driver` / driver install fails**
→ Run `java -version` first. If that fails, fix Java before retrying.

**Tests time out**
→ Set `EXPLICIT_WAIT_MS=40000` in `.env`. Emulators are slower than real devices.

**Port 4723 already in use**
→ A previous Appium server is still running. Kill it:
```cmd
netstat -ano | findstr :4723
taskkill /PID <pid> /F
```

**`allure` not recognized**
→ Re-run the Scoop install from Part 1.4, or use: `npm install -g allure-commandline`

**Element not found**
→ Selectors are tied to this specific app's UI. Use Android Studio's **Layout Inspector** or run `adb shell uiautomator dump` to inspect the live element tree and update selectors in `RegistrationPage.ts`.
