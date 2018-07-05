var CACHE_NAME = 'simplecache';
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        return cache.addAll([
          '/',
          'index.html',
          'restaurant.html',
          'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
          'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
          'js/main.js',
          'js/restaurant_info.js',
          'js/dbhelper.js',
          'css/styles.css',
          'restaurant.html?id=1',
          'restaurant.html?id=2',
          'restaurant.html?id=3',
          'restaurant.html?id=4',
          'restaurant.html?id=5',
          'restaurant.html?id=6',
          'restaurant.html?id=7',
          'restaurant.html?id=8',
          'restaurant.html?id=9',
          'restaurant.html?id=10'
        ]);
      })
  );
});

self.addEventListener('fetch',(event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if(response){
        return response;
      }
      return fetch(event.request).then(networkResponse => {
        if(networkResponse.status === 404){
            return;
        }
        return caches.open('simplecache').then(cache => {
          cache.put(event.request.url,networkResponse.clone());
              return networkResponse;
        })
      })
    }).catch(error => {
      console.log("error ", error);
      return;
    })
  );
});



