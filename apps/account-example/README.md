# Account example

This app shows how you can use [`@tasit/hooks`](https://npm.im/@tasit/hooks) (or the hooks feature in `tasit` package) to generate a new account for the user.

![Account example screenshot](assets/ScreenShot.png?raw=true "Account example screenshot")

## Try the app

Just run `npm start`, `npm run ios`, or `npm run android` to start the app.

## Local development of this app along with local versions of the `tasit` packages

Note: When you want to use the local version of of a `@tasit/bla` lib in an local Expo app like this one while developing, [enable some of the settings in this metro config](./metro.config.js).

To make sure two versions of React aren't found, follow these instructions:

Your bundler might “see” two Reacts — one in the application folder and one in your library folder. One possible fix is to run `npm link ../../../tasit/apps/account-example/node_modules/react` from the lib dir, `tasit-sdk/packages/hooks`. This should make the library use the application’s React copy.

Note that depending on what dir your local app and the library are in, the number of `..`'s is likely to change.

(Source: [This page in the React docs](https://reactjs.org/warnings/invalid-hook-call-warning.html) towards the bottom)
