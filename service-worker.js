const CACHE_NAME='diario-emocoes-v4';
const APP_FILES=['./','./index.html','./manifest.webmanifest','./icons/heart-brain-favicon-v3.png','./icons/heart-brain-ios-v3.png','./icons/heart-brain-192-v3.png','./icons/heart-brain-512-v3.png','./icons/heart-brain-maskable-v3.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin)return;
  event.respondWith(fetch(event.request).then(response=>{
    const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response;
  }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html'))));
