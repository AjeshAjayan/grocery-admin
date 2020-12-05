// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDocC_8xCA1MMn7RtNGWN0a2uIrKsiZ6oo",
    authDomain: "grocery-app-6863f.firebaseapp.com",
    databaseURL: "https://grocery-app-6863f.firebaseio.com",
    projectId: "grocery-app-6863f",
    storageBucket: "grocery-app-6863f.appspot.com",
    messagingSenderId: "867577720090",
    appId: "1:867577720090:web:727ab6d014d166ee85d0a3",
    measurementId: "G-0SKZ2EGBS4"
  },
  baseUrlCloudFn: 'http://localhost:5001/grocery-app-6863f/us-central1/widgets/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
