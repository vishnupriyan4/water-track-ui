// console.log(process.env.REACT_APP_PUBLIC_VAPID_KEY);
// const convertedVapidKey = urlBase64ToUint8Array('BGGtv29oPNvkZWamgmzSN3MRCl6n8XyH-K6_JVKXDHwIPbZkjM2p6f9IEELthC8iFVZIdHtWESS1Y0jbbW6zKqc')
// // const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)

// function urlBase64ToUint8Array(base64String) {
//   const padding = "=".repeat((4 - base64String.length % 4) % 4)
//   // eslint-disable-next-line
//   const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

//   const rawData = window.atob(base64)
//   const outputArray = new Uint8Array(rawData.length)

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i)
//   }
//   return outputArray
// }

// function sendSubscription(subscription) {
//   console.log(JSON.stringify(subscription));
//   return fetch(`${process.env.REACT_APP_API_URL}/users/notifications/subscribe/`, {
//     method: 'POST',
//     body: JSON.stringify(subscription),
//     headers: {
//       'Content-Type': 'application/json',
//     //   'Access-Control-Allow-Origin':'http://localhost:3000'
//     }
//   })
// }

// export function subscribeUser() {
//   // if ('serviceWorker' in navigator && loggedIn) {
//   // let detectedSubscription;
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(function(registration) {
//       if (!registration.pushManager) {
//         console.log('Push manager unavailable.')
//         return
//       }

//       registration.pushManager.getSubscription().then(function(existedSubscription) {
//         if (existedSubscription === null) {
//           console.log('No subscription detected, make a request.')
//           Notification.requestPermission(function(status) {
//             console.log('NOti',status);
//           })
//           registration.pushManager.subscribe({
//             applicationServerKey: convertedVapidKey,
//             userVisibleOnly: true,
//           }).then(function(newSubscription) {
//             console.log('New subscription added.')
//             // sendSubscription(newSubscription)
//             // detectedSubscription = newSubscription;
//             return newSubscription;
//           }).catch(function(e) {
//             if (Notification.permission !== 'granted') {
//               console.log('Permission was not granted.')
//             } else {
//               console.error('An error ocurred during the subscription process.', e)
//             }
//           })
//         } else {
//           console.log('Existed subscription detected.')
//           // sendSubscription(existedSubscription)
//           // detectedSubscription = existedSubscription;
//           return existedSubscription;
//         }
//       })
//     })
//       .catch(function(e) {
//         console.error('An error ocurred during Service Worker registration.', e)
//       })
//   } else {
//       console.log('No Service Worker');
//   }
//   // return detectedSubscription;
// }

// export const subscribeUser = new Promise((resolve, reject) => {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(function(registration) {
//       if (!registration.pushManager) {
//         console.log('Push manager unavailable.')
//         reject(null);
//       }

//       registration.pushManager.getSubscription().then(function(existedSubscription) {
//         if (existedSubscription === null) {
//           console.log('No subscription detected, make a request.')
//           Notification.requestPermission(function(status) {
//             console.log('NOti',status);
//           })
//           registration.pushManager.subscribe({
//             applicationServerKey: convertedVapidKey,
//             userVisibleOnly: true,
//           }).then(function(newSubscription) {
//             console.log('New subscription added.')
//             resolve(newSubscription);
//           }).catch(function(e) {
//             if (Notification.permission !== 'granted') {
//               console.log('Permission was not granted.')
//             } else {
//               console.error('An error ocurred during the subscription process.', e)
//             }
//           })
//         } else {
//           console.log('Existed subscription detected.')
//           resolve(existedSubscription);
//         }
//       })
//     })
//       .catch(function(e) {
//         console.error('An error ocurred during Service Worker registration.', e)
//       })
//   } else {
//     reject(null);
//       console.log('No Service Worker');
//   }
// })
