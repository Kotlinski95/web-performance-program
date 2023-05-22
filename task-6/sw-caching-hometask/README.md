# Service workers hometask

## Task description:

Main goal of the task is to create and register a simple service worker which will just cache files.

## Evaluation criteria

For every day of lateness there is a penalty in 0.5 point. Maximum 10 points.

1. Config webpack to serve service worker (for example you can use workbox-webpack-plugin) [3 point]
2. Register service worker in `index.js` only for browsers which support service workers [2 point]
3. In `service-worker.js` cache `html`, `js` and `css` [3 point]
4. Implement all lifecycle of SW. [2 point]

## Result

Ad. 1. Added piece of code:

```javascript
const { GenerateSW } = require('workbox-webpack-plugin');
...
    plugins: [
        ...
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            swDest: 'service-worker.js',
        }),
    ],
```

into `webpack.config.js:`,

but this generate service-worker file without possibility to modify it by my own.
So I decided to create this file from scratch.
I added `src/service-worker.js:`, with basic configuration.

Ad. 2. Code already prepared:

```javascript
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
```

Ad. 3.

In `service-worker.js` cache `html`, `js` and `css` :

I've added array with cachable files which I used in SW events in order to cache these files:

```javascript
const urlsToCache = ["/", "/index.html", "/bundle.js", "/style.css"];
```

Ad. 4. All SW livecycle events implemented:

```javascript
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

self.addEventListener("message", (event) => {
  console.log(`Received message: ${event.data}`);
});

self.addEventListener("fetch", (event) => {
  console.log("SELF:", self);
  console.log("SW fetch event: ", event);
  event.waitUntil(
    (async () => {
      const clientId =
        event.resultingClientId !== ""
          ? event.resultingClientId
          : event.clientId;
      const client = await self.clients.get(clientId);
      self.serviceWorker.postMessage(client.id);
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
    icon: "/images/icon.png",
    vibrate: [200, 100, 200],
    data: {
      url: "https://www.example.com",
    },
  };

  if (Notification.permission === "granted") {
    self.registration.showNotification("Push Notification", options);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        self.registration.showNotification("Push Notification", options);
      }
    });
  } else {
    console.error("Notification permission denied");
  }
});

self.addEventListener("sync", function (event) {
  console.info("Service worker Service: ", event);
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event);
  event.notification.close();
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed:", event);
});

self.addEventListener("error", (event) => {
  console.error("Error:", event);
});
```
