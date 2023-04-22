const CACHE_NAME = "task-6-cache-v1";
const urlsToCache = [
  '/',
  "/index.html",
  "/bundle.js",
  "/style.css",
];

self.addEventListener("install", (event) => {
  console.info("Service worker instalaltion");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch((error) => console.error(error))
  );
});

self.addEventListener("activate", (event) => {
  console.info("Service worker activation");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return (
                cacheName.startsWith("task-6-cache-") &&
                cacheName !== CACHE_NAME
              );
            })
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
      .catch((error) => console.error(error))
  );
});

self.addEventListener('message', (event) => {
    console.log(`Received message: ${event.data}`);
  });

self.addEventListener("fetch", (event) => {
    console.log("SELF:" , self)
    console.log("SW fetch event: ", event)
    event.waitUntil(
        (async () => {
          const clientId =
            event.resultingClientId !== ""
              ? event.resultingClientId
              : event.clientId;
            const client = await self.clients.get(clientId);
            self.serviceWorker.postMessage(client.id)
        })()
      );

  const requestUrl = new URL(event.request.url);
  // Only cache requests for URLs in the urlsToCache array
  if (urlsToCache.includes(requestUrl.pathname)) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Return the cached response if it exists
            console.log("Cache hit:", requestUrl.pathname);
            return cachedResponse;
          }

          // Fetch the resource from the network and cache it
          console.log("Cache miss:", requestUrl.pathname);
          return fetch(event.request).then((response) => {
            if (
              !response ||
              response.status !== 200 ||
              response.type !== "basic"
            ) {
              return response;
            }
            const responseToCache = response.clone();

            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));

            return response;
          });
        })
        .catch((error) => {
          console.error("Cache match error:", error);
        })
    );
  } else {
    // Fetch the resource from the network without caching it
    event.respondWith(fetch(event.request));
  }
});

self.addEventListener("push", (event) => {
    console.info("Service worker push message: ", event.data.text());
    self.serviceWorker.postMessage(event.data.text());

    const options = {
        body: event.data.text(),
        icon: '/images/icon.png',
        vibrate: [200, 100, 200],
        data: {
          url: 'https://www.example.com'
        }
      };

    if (Notification.permission === "granted") {
        self.registration.showNotification('Push Notification', options)
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            self.registration.showNotification('Push Notification', options)
          }
        });
    }
    else {
        console.error("Notification permission denied")
    }
});

self.addEventListener('sync', function (event) {
    console.info("Service worker Service: ", event);
});

self.addEventListener('notificationclick', event => {
    console.log('Notification clicked:', event);
    event.notification.close();
  });
  
  self.addEventListener('notificationclose', event => {
    console.log('Notification closed:', event);
  });

self.addEventListener('error', event => {
    console.error('Error:', event);
  });
