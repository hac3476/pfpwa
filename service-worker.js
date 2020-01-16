"use strict"; //forces all errors, helps you write cleaner code

//files to cache for offline use
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/client.js",
  "/install.js",
  "/service-worker.js",
  "/addServiceWorker.js",
  "/manifest.json",
  "/style.css",
  "/images/favicon.ico",
  "/images/icon120x120.png",
  "/images/icon144x144.png",
  "/images/icon152x152.png",
  "/images/icon180x180.png",
  "/images/icon192x192.png",
  "/images/icon310x310.png",
  "/images/icon512x512.png"
];

//Providing a cache name allows us to version files, or separate data from the cached resources so that we can easily update one but not affect the other. Update cache names any time any of the cached files change
const CACHE_NAME = "static-cache-v0";
const DATA_CACHE_NAME = "data-cache-v0";

//Adds an install event to the page that caches offline resources
self.addEventListener("install", evt => {
  console.log("[ServiceWorker] Install");
  //precache static resources here
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

//Once your service worker is ready to control clients and handle functional events like push and sync, you'll get an activate event
self.addEventListener("activate", evt => {
  console.log("[Server Worker] Activate");

  //remove previously cached files from disk
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("[Service Worker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

//handle fetch events by looking to the network first, and the cache second
self.addEventListener("fetch", evt => {
  console.log("[Service Worker] Fetch", evt.request.url);
  if (evt.request.url.includes("/animals")) {
    console.log("[Service Worker] Fetch (data)", evt.request.url);
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
          .then(response => {
            //if the response was good, clone it and store it in the cache
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          })
          .catch(err => {
            //network request failed, try to get it from the cache
            return cache.match(evt.request);
          });
      })
    );
    return;
  }
  evt.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
});
