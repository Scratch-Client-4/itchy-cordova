# Itchy

A mobile client (app) for Scratch built with Apache Cordova

[![Join the chat at https://gitter.im/scratchclient4/](https://badges.gitter.im/scratchclient4/mobile.svg)](https://gitter.im/scratchclient4?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![GitHub issues](https://img.shields.io/github/issues-raw/scratch-client-4/itchy-cordova)
![GitHub pull requests](https://img.shields.io/github/issues-pr/scratch-client-4/itchy-cordova)
![GitHub All Releases](https://img.shields.io/github/downloads/Scratch-Client-4/itchy-cordova/total)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Scratch-Client-4/itchy-cordova)

![A screenshot of Itchy](/asset/screenshot.png)

## Building for platforms
### Requirements
- [Git](https://git-scm.org)
- [Node.js](https://nodejs.org) and NPM (most likely  bundled with your Node.js installation)
- The Cordova CLI, install it with: `npm install -g cordova`
  - Note : [macOS users might need to change directory permisisons if getting a permission error.](https://stackoverflow.com/a/47252840/10074924).
- Installations of JDK, Android Studio, and Gradle. Install them according to [this guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).

### Building for android
First, clone the repository:
```bash
git clone https://github.com/scratch-client-4/itchy-cordova
```
Then go into it and install all dependencies:
```bash
cd itchy-cordova
npm install
```

You should see two version numbers appear.  Then run the build script:
```bash
npm run-script build
```
It'll build you the runnable source files (HTML, CSS, and JavaScript) in a directory called `www`.  After that you can build the project into an Android package (APK) file:
```bash
cordova platform add android
cordova build android --minSdkVersion=22
```
The last few lines of the output of that command will tell you where the APK is located.

### Building for browser
For development, you can also run the app in the browser: after `npm run build`, do :
```
cordova platform add browser
cordova run browser
```

## Building assets
As a mobile app, there are several assets that are required to be built for  different screen sizes.  All asset builds use `cordova-res`, which you can install with:

```bash
npm install -g cordova-res
```

### Generating icons
Itchy uses the new standard of [Android Adaptive Icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive), which means that any icon updates must:

- Be high-resolution
- Be made up of foreground and background components
- Fit the size limits of adaptive icons outlined in the [requirements](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)

Building icons is as simple as this:
```bash
cordova-res --type adaptive-icon
cordova-res --type icon
```

The icons are placed in `./resources/android/icon` where they can be referenced by the `config.xml` file.

### Generating splash screens
The splash screen displays when the app is opened but still loading.  It must be simple and also follow the [Cordova splashscreen guidelines](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/).  Splash generation is slightly tricky since we have to build for both light and dark mode.  Light mode is easy enough:

```bash
cordova-res --type splash
```

However, dark mode is not explicitly supported by `cordova-res`, so the team created a custom build script for dark splashes, which **must** be run from the root of the project:

```bash
npm run-script genDarkSplashes
```

Take note that this script is _only designed for Unix-based operating systems_ such as Mac and Linux.  The [forward slashes will break the script on Windows](https://www.howtogeek.com/181774/why-windows-uses-backslashes-and-everything-else-uses-forward-slashes/).  The easiest way to get around this when trying to build on Windows is to temporarily replace the forward slashes (`/`) with escaped backslashes (`\\`).
