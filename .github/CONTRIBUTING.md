### How to get the code on your machine

Open your terminal

`cd` into a directory on your computer where you want to keep your code

Next you'll "clone" the code from GitHub.

`git clone https://github.com/tasitlabs/tasit-apps.git`

`cd tasit`

For this project, `develop` is the name of the default branch for the project. That branch contains the latest code under development, and new changes should be contributed by making a pull request against the develop branch.

### Overview of architecture of the Tasit project

The `tasit` repo (the one you're looking at now) contains the code for our React Native mobile apps. There are multiple apps within this repo. It's a "monorepo" (feel free google this term for more info). That means that in other repos you may have seen for React Native / Expo projects, you would have been able to run `npm start` directly from the root directory to start an app. That's not the case here - you need to `cd` into a subdirectory for the app you'd like to run locally. We do this so it's more straightforward to extract out shared components used in multiple apps for use by the `Tasit CLI`, which autogenerates the scaffolding for an app using these common components.

The "middleware" code for interacting with the Ethereum blockchain that you can use from within a React Native app is over in a different GitHub repo called [`Tasit`](https://github.com/tasitlabs/tasit-sdk). The apps in this repo all use that package.

### How to set up the local environment

You'll need to install the npm packages for one of the apps in this project before you can test it out. The code for those npm packages isn't in this repo - just the name and version of the packages that we use. Those are specified in the `package.json` file for each app. `cd` into `demo` or `decentraland` to see what we mean.

Unlike in the tasit-sdk repo, as of right now there's no single command you can run from the root directory to bootstrap all the projects. `cd` into the `decentraland` directory than then run `npm install` (or `npm i` for short). This will install any code needed to run the app as well as any code you'll need during development on your local machine to work on the app.

Note: If you've already used node and npm before and plan to work on multiple projects, we recommend using [nvm](https://github.com/creationix/nvm) to keep multiple versions on your machine. If you're just getting started with node and npm, that is probably overkill.

### Testing the current version of the code

We use test-driven development (TDD), so to make sure everything is set up right on your machine, the best way is to run the test suite from within any of the app subdirectories. To do this, run:

```
cd decentraland
npm test
```

This will run the tests for the `decentraland` app. We use `jest`, which is a popular testing tool in the `React Native` ecosystem that uses snapshots.

We don't yet have a `pretest` script for any of the apps in this repo, but we may add one, because you'll need `ganache-cli` running locally for the app to be able to interact with a development blockchain.

For each component we want to test in this repo - let's say it's named `MyComponent.js` - we have a separate file named `MyComponent.test.js` where we test the code in that file.

Some other projects keep all their tests in one big test directory, but we find that it's harder to visually confirm if all files are tested that way.

### Making some changes

We recommend using VS Code as your code editor. We use a tool called prettier to automatically format your code. We recommend configuring VS Code to format your code using prettier every time you save changes to a file.

If you don't want to use VS Code or use format on save, you can also run the linting script for one of the apps in the repo by `cd`'ing into that subdirectory and running `npm run lint`.

To make a change, first create a new feature branched named `feature/name-of-my-branch`. You can google how to do this using git if you're not familiar with this yet.

The workflow we follow is [this](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow).

Once you've made changes to the code and/or made changes to the tests, make sure the linting and testing scripts are still working well on your local machine.

Once that's done, you're ready to create a PR (a pull request).

GitHub has some good guides on how to create a PR. When you create one, you'll be prompted to fill out our pull request template.

When a PR is opened from your feature branch, CircleCI will automatically run the linting script and the test suite to make sure that everything will still work if we merge your changes into the develop branch of the main repo on GitHub.

### Local development of an app along with local versions of the `tasit` packages

Note: When you want to use the local version of the parent package, `tasit`, or a local version of a `@tasit/[PACKAGE_NAME]` lib in an local Expo app like this one while developing, [enable some of the settings in this metro config](./metro.config.js).

To make sure two versions of React aren't found, follow these instructions:

Your bundler might “see” two Reacts — one in the application folder and one in your library folder. One possible fix is to run `npm link ../../../tasit-apps/apps/[APP_NAME]/node_modules/react` from the lib dir, `tasit-sdk/packages/[PACKAGE_NAME]`. This should make the library use the application’s React copy.

Note that depending on what dir your local app and the library are in, the number of `..`'s is likely to change.

(Source: [This page in the React docs](https://reactjs.org/warnings/invalid-hook-call-warning.html) towards the bottom)
