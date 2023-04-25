// import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

// const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
// export const b2cPolicies = {
//      names: {
//          signUpSignIn:"B2C_1_SignUpSignIn",
//          editProfile: "B2C_1_ProfileEdit"
//      },
//      authorities: {
//          signUpSignIn: {
//              authority: "https://datatrakr.b2clogin.com/datatrakr.onmicrosoft.com/B2C_1_SignUpSignIn",
//          },
//          editProfile: {
//              authority: "https://datatrakr.b2clogin.com/datatrakr.onmicrosoft.com/B2C_1_ProfileEdit"
//          }
//      },
//      authorityDomain: "datatrakr.b2clogin.com"
//  };
 
 
// export const msalConfig: Configuration = {
//      auth: {
//          clientId: 'ae71fc3a-5fb1-4f32-bf24-ddd948313dcb',
//          authority: b2cPolicies.authorities.signUpSignIn.authority,
//          knownAuthorities: [b2cPolicies.authorityDomain],
//          redirectUri: '/', 
//      },
//      cache: {
//          cacheLocation: BrowserCacheLocation.LocalStorage,
//          storeAuthStateInCookie: isIE, 
//      },
//      system: {
//          loggerOptions: {
//             loggerCallback: (logLevel, message, containsPii) => {
//                 console.log(message);
//              },
//              logLevel: LogLevel.Verbose,
//              piiLoggingEnabled: false
//          }
//      }
//  }

// export const protectedResources = {
//   todoListApi: {
//     endpoint: "https://localhost:7196",
//     scopes: ["https://datatrakr.onmicrosoft.com/api/account.read",
//              "https://datatrakr.onmicrosoft.com/api/customer.read"],
//   },
// }
// export const loginRequest = {
//   scopes: ['email']
// };