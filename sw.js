/*self.addEventListener("install", event => {
    console.log("Service Worker installing.");
  });
  
  self.addEventListener("activate", event => {
    console.log("Service Worker activating.");
  });

  const CACHE_NAME = 'cool-cache';

  // Add whichever assets you want to pre-cache here:
  const PRECACHE_ASSETS = [
      '/asset/',
      '/css/'
  ]
  
  // Listener for the install event - pre-caches our assets list on service worker install.
  self.addEventListener('install', event => {
      event.waitUntil((async () => {
          const cache = await caches.open(CACHE_NAME);
          cache.addAll(PRECACHE_ASSETS);
      })());
  });*/
  self.addEventListener('install', (event) => {
    event.waitUntil(
      (async function () {
        const cache = await caches.open('my-cache-V1');
        await cache.addAll([
          '/asset/',
          '/css/',
        ]);
      })(),
    );
  });
  