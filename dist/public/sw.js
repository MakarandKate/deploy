const cacheName = 'ezo-of';
const precacheResources = [
];
self.addEventListener('install', event => {
    const preCache = async () => {
      const cache = await caches.open(cacheName);
      return cache.addAll(precacheResources);
    };
    event.waitUntil(preCache());
});

self.addEventListener('activate', event => {
    
});

self.addEventListener('fetch', event => {
    if (event.request.method != 'GET') return;

    const request = event.request;
    const url = new URL(request.url);
    let fileExtArray=["js","css","woff2","svg","gif","fonts.googleapis.com","png","jpg","jepg"];
    let isCachable=false;
    fileExtArray.map((x)=>{
        if(url.href.indexOf(x)!=-1){
            isCachable=true;
        }
    });
    if(isCachable){
        event.respondWith(cacheFirst(request));
    }else{
        event.respondWith(networkFirst(request));
    }
});

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if(cachedResponse){
      return cachedResponse;
    }else{
      const dynamicCache = await caches.open(cacheName);
      try {
        const networkResponse = await fetch(request);
        dynamicCache.put(request, networkResponse.clone());
        return networkResponse;
      } catch (err) {
        console.error(err);
      }
    }
}
  
async function networkFirst(request) {
    
    const dynamicCache = await caches.open(cacheName);
    try {
      const networkResponse = await fetch(request);
      dynamicCache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (err) {
      const cachedResponse = await dynamicCache.match(request);
      return cachedResponse || await caches.match('./fallback.json');
    }
}