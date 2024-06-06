// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   application: {
//     api: 'http://localhost:8080/api',
//     landingPortal: 'http://localhost:3007'
//   }
// };

export const environment = {
  production: false,
  application: {
    api: 'http://a4d98e47c12f34885ae3b657f7859e5c-1182517644.us-east-1.elb.amazonaws.com:8080/api',
    landingPortal: 'http://a29e50cc6dd1245a5939f521a9c5bb75-42843292.us-east-1.elb.amazonaws.com:3007'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
