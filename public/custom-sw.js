self.addEventListener("install", event=>event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event=>
event.waitUntil(self.clients.claim())
);
self.addEventListener('push', event => {
    const data = event.data.json()
    console.log('New notification', data)
    const options = {
      body: data.body,
      icon: './resize-96.png',
      actions: [
        {action: 'confirm', title: 'Drank'},
        {action: 'close', title: 'Close'
        },
      ]
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
      clients.openWindow('http://localhost:3000');
      notification.close();
    }
  });
  
console.log('Hello service worker started');