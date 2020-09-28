# SC4 Mobile

A mobile app for Scratch Client 4 built with Apache Cordova.

[![Join the chat at https://gitter.im/scratchclient4/](https://badges.gitter.im/scratchclient4/mobile.svg)](https://gitter.im/scratchclient4?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![GitHub issues](https://img.shields.io/github/issues-raw/scratch-client-4/mobile)
![GitHub pull requests](https://img.shields.io/github/issues-pr/scratch-client-4/mobile)
![GitHub All Releases](https://img.shields.io/github/downloads/Scratch-Client-4/mobile/total)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Scratch-Client-4/mobile)

![A screenshot of SC4 on an Android Phone](/asset/screenshot.png)

## Building
### Requirements
- [Git](https://git-scm.org)
- [Node.js](https://nodejs.org) and NPM (most likely  bundled with your Node.js installation)
- The Cordova CLI, install it with: `npm install -g cordova`
  - Note : [macOS users might need to change directory permisisons if getting a permission error.](https://stackoverflow.com/a/47252840/10074924).
- A JDK, Android Studio, and Gradle. Install them according to [this guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).

First, clone the repository:
```bash
git clone https://github.com/scratch-client-4/mobile
```
Then go into it and install all dependencies:
```bash
cd mobile
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

For development, you can also run the app in the browser : after `npm run build`, do :
```
cordova platform add browser
cordova run browser
```
