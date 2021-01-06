import { SET_ID } from './types';
import axiosWrapper from '../../../../apis/axiosCreate';
// import { subscribeUser } from '../../../../subscription';
import localForage from 'localforage';

export const setUserId = (userDetails, subscriptionObj) => async (dispatch) => {
    // await subscribeUser.then(async (subscriptionObj) => {
    //     const resp = await axiosWrapper.post(`/users/addUser`, {...userDetails, subscription: subscriptionObj})
    //     window.localStorage.setItem('userAuthId', resp.data.userId);
    //     window.localStorage.setItem('jwtToken', resp.data.jwt);
    //     // localForage.setItem('userAuthId',resp.data );
    //         dispatch ({
    //             type: SET_ID,
    //             payload: resp.data
    //         })
    // }, async (err) => {
    //     const resp = await axiosWrapper.post(`/users/addUser`, {...userDetails, subscription: null})
    //     window.localStorage.setItem('userAuthId', resp.data.userId);
    //     window.localStorage.setItem('jwtToken', resp.data.jwt);
    //     // localForage.setItem('userAuthId',resp.data );
    //         dispatch ({
    //             type: SET_ID,
    //             payload: resp.data
    //         })
    // })
    const resp = await axiosWrapper.post(`/users/addUser`, {...userDetails, subscription: subscriptionObj})
        // window.localStorage.setItem('userAuthId', resp.data.userId);
        // window.localStorage.setItem('jwtToken', resp.data.jwt);
        await localForage.setItem('userAuthId', resp.data.userId);
        await localForage.setItem('jwtToken', resp.data.jwt);
        console.log("RESP", resp.data);
        // localForage.setItem('userAuthId',resp.data );
            dispatch ({
                type: SET_ID,
                payload: resp.data.userId
            })
}

export const setUserIdLocal = (id) => async (dispatch) => {
    // localForage.setItem('userAuthId',id );
    await dispatch({
        type: SET_ID,
        payload: id
    })
}


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

// const subscribeUser = new Promise((resolve, reject) => {
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.ready.then(function(registration) {
//         if (!registration.pushManager) {
//           console.log('Push manager unavailable.')
//           reject(null);
//         }
  
//         registration.pushManager.getSubscription().then(function(existedSubscription) {
//           if (existedSubscription === null) {
//             console.log('No subscription detected, make a request.')
//             Notification.requestPermission(function(status) {
//               console.log('NOti',status);
//             })
//             registration.pushManager.subscribe({
//               applicationServerKey: convertedVapidKey,
//               userVisibleOnly: true,
//             }).then(function(newSubscription) {
//               console.log('New subscription added.')
//               resolve(newSubscription);
//             }).catch(function(e) {
//               if (Notification.permission !== 'granted') {
//                 console.log('Permission was not granted.')
//               } else {
//                 console.error('An error ocurred during the subscription process.', e)
//               }
//             })
//           } else {
//             console.log('Existed subscription detected.')
//             resolve(existedSubscription);
//           }
//         })
//       })
//         .catch(function(e) {
//           console.error('An error ocurred during Service Worker registration.', e)
//         })
//     } else {
//       reject(null);
//         console.log('No Service Worker');
//     }
//   })