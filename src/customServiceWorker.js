// import { returnUserId } from './App';

// const userId = require('../userId');
// const userId = () => self.importScripts('http://localhost:5000/userId.js').userId();
// importScripts('localforage.min.js');
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
// let userId;
// localforage.getItem('userAuthId').then(id => userId = id)
// self.addEventListener("install", event=>event.waitUntil(self.skipWaiting()));
self.addEventListener("install", event=> self.skipWaiting());
self.addEventListener("activate", event=>
event.waitUntil(self.clients.claim())
);
self.addEventListener('push', event => {
    const data = event.data.json()
    console.log('New notification', data);
    let options;
    if (data.actions) {
      options = {
        body: data.body,
        icon: './logo-human-96x96.png',
        actions: data.actions
      }
    } else {
      options = {
        body: data.body,
        icon: './logo-human-96x96.png'
      }
    }
    // const options = {
    //   body: data.body,
    //   icon: './resize-96.png',
    //   actions: [
    //     {action: 'confirm', title: 'Drank'},
    //     {action: 'close', title: 'Close'
    //       // icon: 'images/xmark.png'
    //     },
    //   ]
    // }
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });

  self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var action = e.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('https://water-track-337ea.web.app/');
      notification.close();
    }
  });
  
console.log('Hello service worker started');

workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.precaching.precacheAndRoute([
    // "/home"
    // 'http://localhost:9000/',
    // 'https://yoyo-gift-301-api.herokuapp.com/',
    // `http://localhost:9000/users/findUser/5f22d2ade4d79efa5ca556b0`
])
//appshell
workbox.routing.registerRoute("/home", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/notification", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/settings", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/consent", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/", workbox.strategies.networkFirst())
workbox.routing.registerRoute(new RegExp('https:\/\/water-track-api.herokuapp.com\/users\/findUser\/(.*)'), workbox.strategies.networkFirst())
