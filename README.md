# Cinemagz App

Cinemagz App is a movie search and discovery app that makes it easy for you to find detailed information about movies, crew members, and your favorite actors. All movie data and posters are provided by The Movie Database (TMDB).

![App Screenshot](docs/images/Cinemagz.png)

## Tech Stack

- React Native 0.88.1 (New Architecture, Hermes), React 19.3
- TypeScript 6 (`strict`)
- Android target SDK 36, compile SDK 37 (edge-to-edge)
- React Navigation 7 (stack + bottom tabs)
- TanStack Query 5 (server state, TMDB API)
- Zustand 5 (client state, persisted with AsyncStorage 3)
- Firebase 27 (Auth + Firestore, modular API)
- Reanimated 4 + react-native-reanimated-carousel 5
- twrnc (Tailwind for React Native)
- Axios
- @d11/react-native-fast-image, react-native-svg, lucide-react-native

Only Android is maintained. The `ios/` folder still uses the React Native 0.79 template and needs to be migrated before an iOS release.

## Environment

Copy `.env.example` to `.env` and fill in your TMDB "API Read Access Token". The file is read at build time by `react-native-config`, so rebuild the app after changing it.

## Scripts

```bash
yarn lint        # ESLint
yarn typecheck   # TypeScript (tsc --noEmit)
yarn test        # Jest
```

## Installation

First, install the project dependencies by running:

```bash
# using npm
npm install

# OR using Yarn (recommended, yarn.lock is committed)
yarn install
```

Then, start Metro — the JavaScript bundler that ships with React Native — by running::

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Android Release Signing

Release signing values are **not** stored in this repository. Before building a signed release (`yarn aabRelease` / `yarn apkRelease`):

1. Copy the upload keystore file into `android/app/` (it is ignored by git via the `*.keystore` pattern), or to any path you prefer.
2. Add these values to your user-level `~/.gradle/gradle.properties` (not the project's `android/gradle.properties`), or set them as environment variables in CI:

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=your-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

`MYAPP_UPLOAD_STORE_FILE` is resolved relative to `android/app/`. If any value is missing or the keystore file does not exist, the release build is produced unsigned and debug builds keep working.
