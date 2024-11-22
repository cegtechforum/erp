self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          '/',
          '/manifest.json',
          '/icons/icon-192x192.png', // Update file name here if not resizing
        ]);
      })
    );
  });
  