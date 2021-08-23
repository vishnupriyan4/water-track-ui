workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

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
//appshell
workbox.routing.registerRoute("/home", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/notification", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/settings", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/consent", workbox.strategies.networkFirst())
workbox.routing.registerRoute("/", workbox.strategies.networkFirst())
workbox.routing.registerRoute(new RegExp('https:\/\/water-track-api.herokuapp.com\/users\/findUser\/(.*)'), workbox.strategies.networkFirst())
