// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//=========================Developer Guid==============================
//serve commands & build command for Dev
// For Localhost
//# ng serve 
//# ng build 

//Australia
//# ng serve --configuration=dev_au
//# ng build --configuration=dev_au
//# ng build --configuration=dev_au --aot=false --sourceMap=false --buildOptimizer=false
//optional for browser side caching 
//--aot --outputHashing=all
//India
//# ng serve --configuration=dev_in 
//# ng build --configuration=dev_in

//Srilanka
//# ng serve --configuration=dev_sl 
//# ng build --configuration=dev_sl

//----------------------------------------------------------

//serve commands & build command for Prod
// For Localhost
//# ng serve 
//# ng build 

//Australia
//# ng serve --configuration=prod_au
//# ng build --configuration=prod_au --aot --outputHashing=all

//India
//# ng serve --configuration=prod_in 
//# ng build --configuration=prod_in --aot --outputHashing=all

//Srilanka
//# ng serve --configuration=prod_sl 
//# ng build --configuration=prod_sl
//=======================Developer Guide end here=======================




export const environment = {
  production: false,
  //BaseURL: 'http://localhost:5000',
  WebBaseUrl: 'http://localhost:4200', 
  BaseURL: 'https://dev.regullo.com',
}


























//  // WebBaseUrl : 'https://web.myaccountant.io',
//   // BaseURL : 'https://au.myaccountant.io',
//   //WebBaseUrl : 'https://sl.myaccountant.io',
//   //WebBaseUrl : 'https://in.myaccountant.io',
//   PosUrl: 'https://pos.myaccountant.io',
//   S3_PREDEFINE_URL: "https://dev-myaccountant-api-files.s3.ap-south-1.amazonaws.com/",
//   SECRET_KEY: "MaDevWebSecureAU",
//   UploadFolderName: "uploads",
//   //google recaptcha setting also occurred from google account , like whitelist domain
//   SITE_KEY: "6LcyyUYaAAAAAEkR55uxlJl2X0E0PZbcd-f2s6ho",
//   GoogleClientId: "292198159160-bq0dgpvljv3n27chlspq6dtughk82b8r.apps.googleusercontent.com",
//   GooglePluginName: "Web client 1",
//   //Support url
//   SupportUrl: "https://www.myaccountant.co/documentation",
//   VideoMeetUrl: "https://whereby.com/myaccountant",

//   xeroLoginUrl: "https://login.xero.com/identity/connect/authorize?response_type=code&client_id=13AEA8821BB84756B8338FB3AA8BAB6C&redirect_uri=http://localhost:4200/auth/login?xero=yes&scope=openid profile email",
//   xeroSignupUrl: "https://login.xero.com/identity/connect/authorize?response_type=code&client_id=13AEA8821BB84756B8338FB3AA8BAB6C&redirect_uri=http://localhost:4200/auth/social-signup?xero=yes&scope=openid profile email",
//   //Stripe publishable key
//   // StripePublicKey: "pk_test_HoFLyGF31T7dSwJovMN9bGNb",
//   //StripePublicKey: "pk_live_rV201zZuinX0YVXSz3Q47wwh",
//   StripePublicKey: "pk_test_51LxqVVGXjJhsLsHiEpmZEiZ6MJJpqCDL8a0bI9KYPBiKkAKy6SdIQ6G8caqlKZZHksWLmTGNIrXbsUJJU7apLz3p00YgvMADPC",
//   //StripePublicKey: "pk_test_51IVuCJEvLomdMLeYoU9tOKV1HzAMxflfs09mEz3CEW2hOxBkzRuPwevNwUVajj4xxLU5XnjazzkDI7nTNu0cZhpX00621jejgW",
//   country: {
//     CountryCode: "AU",
//     CurrencySymbol: "$",
//     MonthStart: 7,
//     MonthEnd: 6,
//     StartDay: 1,
//     EndDay: 30,
//     DateFormat: "dd MMM yyyy",
//     DateFormatWithTime: "dd MMM yyyy h:mm a",
//     TimeFormat: "h:mm a",
//     ApiDateFormat: "yyyy-MM-dd",
//     DatePickerFormat: "DD/MM/YYYY"
//   }
//   //   country:{
//   //     CountryCode:"IN",
//   //     CurrencySymbol:"₹",
//   //     MonthStart:4,
//   //     MonthEnd:3,
//   //     StartDay:1,
//   //     EndDay:31,
//   //     DateFormat:"dd MMM yyyy",
//   //     DateFormatWithTime:"dd MMM yyyy h:mm a",
//   //     TimeFormat:"h:mm a",
//   //     ApiDateFormat:"yyyy-MM-dd",
//   //     DatePickerFormat:"DD/MM/YYYY"
//   // }
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
