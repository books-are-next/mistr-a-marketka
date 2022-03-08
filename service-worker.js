/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-df92a59';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./mistr_a_marketka_001.html","./mistr_a_marketka_002.html","./mistr_a_marketka_003.html","./mistr_a_marketka_004.html","./mistr_a_marketka_005.html","./mistr_a_marketka_006.html","./mistr_a_marketka_007.html","./mistr_a_marketka_008.html","./mistr_a_marketka_009.html","./mistr_a_marketka_010.html","./mistr_a_marketka_011.html","./mistr_a_marketka_012.html","./mistr_a_marketka_013.html","./mistr_a_marketka_014.html","./mistr_a_marketka_015.html","./mistr_a_marketka_016.html","./mistr_a_marketka_017.html","./mistr_a_marketka_018.html","./mistr_a_marketka_019.html","./mistr_a_marketka_020.html","./mistr_a_marketka_021.html","./mistr_a_marketka_022.html","./mistr_a_marketka_023.html","./mistr_a_marketka_024.html","./mistr_a_marketka_025.html","./mistr_a_marketka_026.html","./mistr_a_marketka_027.html","./mistr_a_marketka_028.html","./mistr_a_marketka_029.html","./mistr_a_marketka_030.html","./mistr_a_marketka_031.html","./mistr_a_marketka_032.html","./mistr_a_marketka_033.html","./mistr_a_marketka_034.html","./mistr_a_marketka_035.html","./mistr_a_marketka_036.html","./mistr_a_marketka_037.html","./mistr_a_marketka_039.html","./mistr_a_marketka_040.html","./mistr_a_marketka_041.html","./mistr_a_marketka_038.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/obalka_mistr_a_marketk_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
