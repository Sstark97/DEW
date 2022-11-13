const cacheName = 'MinesWeeper'
const filesToCache = [
    '/', 
    '/index.html', 
    '/style/output.css', 
    '/js/index.js',
    '/js/actions.js',
    '/js/const.js',
    '/js/general.js',
    '/js/squares.js'
]

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache)
        })
    )
})

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request)
        })
    )
})
