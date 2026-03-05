# E2E Testing — Beginner Teaching Guide

A reference for teaching a beginner SQA. Covers the core concept and the minimum setup needed to run one test.

---

## The Big Picture

Manual testing = a human opens the app, taps through it, checks things work. Slow and error-prone.

E2E testing = code that does that instead. It opens the app, taps buttons, fills forms, and checks results automatically. You run one command and it does the work.

**The tools we use:**

| Tool | Role |
|---|---|
| **Appium** | Talks to the Android device — sends taps, swipes, text |
| **WebdriverIO** | Runs your tests and talks to Appium |
| **TypeScript** | The language tests are written in |
| **Node.js** | Runs TypeScript on your machine |
| **Java** | Android tools need it (we don't write Java) |
| **Yarn** | Downloads and manages all the libraries |

---

## Step 1 — Install the Tools

Open **PowerShell as Administrator**.

**Chocolatey** (Windows package manager):
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

**Node.js and Java:**
```powershell
choco install -y nodejs-lts microsoft-openjdk17
```

**Yarn:**
```cmd
npm install -g yarn
```

**Android Studio** — download from `https://developer.android.com/studio`, run the installer, complete the Setup Wizard. Then in **Tools → SDK Manager** install:
- SDK Platforms: Android 13.0 (API 33)
- SDK Tools: Build-Tools, Platform-Tools, Emulator

Then add these to your system `Path` environment variable (replace with your actual SDK path):
```
C:\Users\YourName\AppData\Local\Android\Sdk\platform-tools
C:\Users\YourName\AppData\Local\Android\Sdk\emulator
```

Verify everything works:
```cmd
node --version
java -version
adb version
```

---

## Step 2 — Set Up an Android Device

**Emulator (easiest):**

In Android Studio → Tools → Device Manager → Create Virtual Device → Pixel 6 → API 33 → Finish.

Start it:
```cmd
emulator -avd Pixel_6_API_33
```

Wait for the home screen, then check:
```cmd
adb devices
# Should show: emulator-5554   device
```

**Real phone:**

Settings → About Phone → tap Build Number 7 times → Developer Options → enable USB Debugging → connect USB → accept the prompt on the phone.

```cmd
adb devices
# Should show your device serial with status "device"
```

---

## Step 3 — Create a Minimal Project

```cmd
mkdir my-e2e-project
cd my-e2e-project
yarn init -y
```

Install everything needed:
```cmd
yarn add -D @wdio/cli@^8 @wdio/local-runner@^8 @wdio/mocha-framework@^8 @wdio/spec-reporter@^8 @wdio/appium-service@^8 appium@^3 appium-uiautomator2-driver@^7 typescript@^5 ts-node@^10 tsconfig-paths@^4 @types/node @types/mocha dotenv
```

Install the Android driver:
```cmd
npx appium driver install uiautomator2
```

---

## Step 4 — Three Files to Understand

The whole project is just three things working together:

```
config.ts       ← tells WebdriverIO which device to use
WelcomePage.ts  ← knows where buttons/fields are on one screen
test.ts         ← the actual test steps (tap this, check that)
```

### tsconfig.json

TypeScript needs this to run. Create it at the project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}
```

### config.ts

```typescript
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const config: WebdriverIO.Config = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: { transpileOnly: true }
  },

  hostname: 'localhost',
  port: 4723,
  path: '/',

  specs: ['./**/*.test.ts'],
  maxInstances: 1,

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.DEVICE_NAME || 'Android Device',
    'appium:udid': process.env.UDID,
    'appium:appPackage': process.env.APP_PACKAGE,
    'appium:appActivity': process.env.APP_ACTIVITY,
    'appium:noReset': true,
    'appium:forceAppLaunch': true,
  }],

  services: [['appium', {
    command: path.resolve('./node_modules/.bin/appium'),
    args: { relaxedSecurity: true }
  }]],

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 60000 },
};
```

### .env

Create a `.env` file next to config.ts:
```env
DEVICE_NAME=emulator-5554
UDID=emulator-5554
APP_PACKAGE=com.yourapp
APP_ACTIVITY=.MainActivity
```

### WelcomePage.ts

A **Page Object** is a class that represents one screen. It holds:
- **Selectors** — how to find each element
- **Methods** — what you can do on that screen

```typescript
class WelcomePage {
  // Selector = how to find the button on screen
  get createAccountButton() {
    return '//android.widget.Button[@content-desc="CREATE ACCOUNT"]';
  }

  // Method = what to do with it
  async tapCreateAccount() {
    const btn = await $(this.createAccountButton);
    await btn.waitForDisplayed({ timeout: 15000 });
    await btn.click();
  }
}

export default new WelcomePage();
```

> **How do you find a selector?** Run `adb shell uiautomator dump` while the app is open — it creates an XML file of everything on screen. Or use Android Studio's Layout Inspector. Look for the `content-desc` or `text` attribute of the element you want.

### welcome.test.ts

```typescript
import WelcomePage from './WelcomePage';

describe('Welcome Screen', () => {

  it('should show the Create Account button', async () => {
    const btn = await $(WelcomePage.createAccountButton);
    await btn.waitForDisplayed({ timeout: 15000 });
    expect(await btn.isDisplayed()).toBe(true);
  });

  it('should navigate to Registration when tapped', async () => {
    await WelcomePage.tapCreateAccount();
    // add a check for the next screen here
  });

});
```

> **`describe`** = a group of related tests (like a chapter)
> **`it`** = one test case — always starts with "should..."
> **`expect(...).toBe(true)`** = the check. If false, the test fails.

---

## Step 5 — Run It

Add this to `package.json` scripts:
```json
"scripts": {
  "test": "wdio run config.ts"
}
```

Make sure your emulator is running (`adb devices` shows `device`), then:
```cmd
yarn test
```

You will see each test pass or fail in the terminal.

---

## The Core Idea (One Sentence Each)

- **Page Object** — one class per screen; keeps selectors and actions in one place so tests are readable
- **Selector** — a string that uniquely identifies a UI element (like a CSS selector but for mobile)
- **`async/await`** — because tapping and waiting for screens takes time; `await` pauses until it's done
- **`expect`** — the assertion; this is where the test actually checks something

---

## Common Problems

| Problem | Fix |
|---|---|
| `adb not recognized` | Add `platform-tools` to your system Path |
| Device shows `offline` | Unplug and reconnect; accept the USB debugging prompt on phone |
| `java not recognized` | Reopen terminal after install; check `JAVA_HOME` is set |
| Test times out | The element wasn't found in time — check your selector |
| Port 4723 in use | `netstat -ano \| findstr :4723` then `taskkill /PID <number> /F` |
