# SC4 Mobile

A mobile app for Scratch Client 4 built with Apache Cordova

[![Join the chat at https://gitter.im/scratchclient4/](https://badges.gitter.im/scratchclient4/mobile.svg)](https://gitter.im/scratchclient4?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![GitHub issues](https://img.shields.io/github/issues-raw/scratch-client-4/mobile)
![GitHub pull requests](https://img.shields.io/github/issues-pr/scratch-client-4/mobile)
![GitHub All Releases](https://img.shields.io/github/downloads/Scratch-Client-4/mobile/total)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Scratch-Client-4/mobile)

![a screenshot of SC4](/asset/screenshot.png)

## Building yourself
You can easily build this app yourself if you've got a computer and an Internet connection!  First, clone the repository:
```bash
git clone https://github.com/scratch-client-4/mobile
```
Then go into it:
```bash
cd mobile
```
Make sure you've got NPM, Parcel, and Cordova installed:
```bash
npm -v && parcel -V && cordova -v
```
You might also need to configure your Cordova environment with [this guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).

You should see two version numbers appear.  Then run the build script:
```bash
npm run-script build
```
It'll build you the runnable source files (HTML, CSS, and JavaScript) in a directory called `www`.  After that you can build the project into an Android APK file: 
```bash
cordova build
```
The last few lines of the output of that command will tell you where the APK is located.
