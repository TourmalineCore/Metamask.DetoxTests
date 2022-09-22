# E2E Testing WalletConnect DApp

## MetaMask Mobile

### Environment Setup

The code is built using React-Native and running code locally requires a Mac or Linux OS.

-   Install [sentry-cli](https://github.com/getsentry/sentry-cli) tools: `brew install getsentry/tools/sentry-cli`

-   Install [Node.js](https://nodejs.org) **version 14 (latest stable) and yarn@1 (latest)**
-   Install yarn
-   Install the shared [React Native dependencies](https://reactnative.dev/docs/environment-setup#installing-dependencies) (`React Native CLI`, _not_ `Expo CLI`)

### Device Environment Setup

#### Android

-   Install the Android SDK, via [Android Studio](https://developer.android.com/studio).
    -   _MetaMask Only:_ To create production builds, you need to install Google Play Licensing Library via the SDK Manager in Android Studio.
-   Install the Android NDK, via [Android Studio](https://developer.android.com/studio)'s SDK Manager.
    -   In the SDK Manager, select the `SDK Tools` tab and install NDK version `21.4.7075529`. You'll need to click "Show Package Details" in order to select the appropriate version.
-   Linux only:
    -   Ensure that you have the `secret-tool` binary on your machine.
        -   Part of the [libsecret-tools](https://launchpad.net/ubuntu/bionic/+package/libsecret-tools) package on Debian/Ubuntu based distributions.
-   Install the correct emulator
    -   Follow the instructions at:
        -   [React Native Getting Started - Android](https://reactnative.dev/docs/environment-setup#installing-dependencies) _(React Native CLI Quickstart -> [your OS] -> Android)_
        -   More details can be found [on the Android Developer site](https://developer.android.com/studio/run/emulator)
    -   You should use the following:
        -   **Android OS Version:** Android 10 (Api level 29)
        -   **Device:** Google Pixel 3
-   Finally, start the emulator from Android Studio, and run:

### Building Locally

-   Clone this repo:
```bash
git clone ...
cd metamask-mobile
```

-   _MetaMask Only:_ Rename the `.*.env.example` files (remove the `.example`) in the root of the project and fill in the appropriate values for each key. Get the values from another MetaMask Mobile developer.
-   _Non-MetaMask Only:_ In the project root folder run
```
  cp .android.env.example .android.env && \
  cp .js.env.example .js.env
```
-   _Non-MetaMask Only:_ Create an account and generate your own API key at [Infura](https://infura.io) in order to connect to main and test nets. Fill `MM_INFURA_PROJECT_ID` in `.js.env`. (App will run without it, but will not be able to connect to actual network.)

-   Then, in one terminal, run:
```bash
yarn watch
```

#### Android
```bash
yarn start:android
```

#### Build Troubleshooting

Unfortunately, the build system may fail to pick up local changes, such as installing new NPM packages or `yarn link`ing a dependency.
If the app is behaving strangely or not picking up your local changes, it may be due to build issues.
To ensure that you're starting with a clean slate, close all emulators/simulators, stop the `yarn watch` process, and run:

```bash
yarn clean

# if you're going to `yarn link` any packages,
# do that here, before the next command

yarn watch:clean

# ...and then, in another terminal

yarn start:android
```

If `yarn link` fails after going through these steps, try directly `yarn add`ing the local files instead.

### Running Tests

Before you run E2E-tests, we need launch **API server** of [this](https://github.com/TourmalineCore/NinDAO.Api-service) project and **dao-service-stub** server of [this](https://github.com/TourmalineCore/NinDAO.Api-tests)

#### E2E Tests (Android)

```bash
yarn test:e2e:android
```

### Changing dependencies

Whenever you change dependencies (adding, removing, or updating, either in `package.json` or `yarn.lock`), there are various files that must be kept up-to-date.

-   `yarn.lock`:
    -   Run `yarn setup` again after your changes to ensure `yarn.lock` has been properly updated.
-   The `allow-scripts` configuration in `package.json`
    -   Run `yarn allow-scripts auto` to update the `allow-scripts` configuration automatically. This config determines whether the package's install/postinstall scripts are allowed to run. Review each new package to determine whether the install script needs to run or not, testing if necessary.
    -   Unfortunately, `yarn allow-scripts auto` will behave inconsistently on different platforms. macOS and Windows users may see extraneous changes relating to optional dependencies.
