# Photo Uploader (vue-firebase-image-upload)

This is the code from my [blog post](https://www.learningsomethingnew.com/how-to-make-an-image-uploading-app-with-vue-firebase-storage-and-cordova-part-1) on building a cross platform mobile image uploading app.

## Firebase config
You'll need to create a Firebase Cloud Storage project and save your credentials in `src/services/firebase-config.js`.
For instructions on how to do this, follow the links provided in the [blog post](https://www.learningsomethingnew.com/how-to-make-an-image-uploading-app-with-vue-firebase-storage-and-cordova-part-1).

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev -m android/ios
```


### Build the app for production
```bash
quasar build -m android/ios
```

