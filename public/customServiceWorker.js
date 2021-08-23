workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
self.addEventListener("install", event=>event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event=>
event.waitUntil(self.clients.claim())
);
self.addEventListener('push', event => {
    const data = event.data.json();
    let options;
    if (data.actions) {
      options = {
        body: data.body,
        icon: './resize-96.png',
        actions: data.actions
      }
    } else {
      options = {
        body: data.body,
        icon: './resize-96.png'
      }
    }
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
      clients.openWindow('http://localhost:5000');
      notification.close();
    }
  });
  
console.log('Hello service worker started');

workbox.precaching.precacheAndRoute(self.__precacheManifest);
//appshell
workbox.routing.registerRoute("/home", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/notification", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/", workbox.strategies.networkFirst())
workbox.routing.registerRoute(new RegExp('http:\/\/localhost:9000\/users\/findUser\/(.*)'), workbox.strategies.networkFirst())
