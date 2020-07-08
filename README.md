# SC4 Mobile

A mobile app for Scratch Client 4 built with Adobe PhoneGap

<a href = "https://build.phonegap.com/apps/3916109/share"><img src=https://build.phonegap.com/apps/3916109/badge/3152967120/android.svg /></a>
[![Join the chat at https://gitter.im/scratchclient4/](https://badges.gitter.im/scratchclient4/mobile.svg)](https://gitter.im/scratchclient4?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![GitHub issues](https://img.shields.io/github/issues-raw/scratch-client-4/mobile)
![GitHub pull requests](https://img.shields.io/github/issues-pr/scratch-client-4/mobile)

## Building yourself
You can easily build this app yourself if you've got a computer runnign macOS or Linux and an Internet connection!  First, clone the repository:
```bash
git clone https://github.com/scratch-client-4/mobile
```
Then go into it:
```bash
cd mobile
```
Make sure you've got NPM and Parcel installed:
```bash
npm -v && parcel -V
```
You should see two version numbers appear.  Then run the build script:
```bash
npm run-script build
```
It'll build you the runnable source files (HTML, CSS, and JavaScript) in a new directory called `dist`.  Now move into  dist and compress the files into a zip:
```bash
cd dist
zip dist *
```
After that, go to https://build.phonegap.com and upload the zip as a new application.  You're done!  PhoneGap will start a build and your files will be an app in a few minutes.
