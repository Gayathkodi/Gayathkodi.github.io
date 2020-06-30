const cacheName = 'Gayath_v1';

const cacheAssets = [
    'Home.html',
    'Skills.html',
    'Qualifications.html',
    'Cloud-V1.html',
    'Cloud-V2.html',
    'Coffee.html',  
    'manifest.json',
    'sw_cached_pages.js',    
    'Scripts/Navigation-Bar.js',     
    'Scripts/Home-Page/Homepage_image_slider_part_1.js',
    'Scripts/Home-Page/Homepage_image_slider_part_2.js',
    'Scripts/Qualification-Page/Table.js',
    'Scripts/Qualification-Page/Qualifications-reference.js',
    'Scripts/Coffee-Page/Coffee-Image-Slider.js',
    'Scripts/Coffee-Page/store.js',
    'register.js',
    'Styles/Home.css',
    'Styles/Normalize.css',
    'Styles/Qualification.css',
    'Styles/Skills.css',
    'Styles/Cloud-V1.css',
    'Styles/Cloud-V2.css',
    'Styles/cof-styles.css',
    'Images/Home-Page/myself.webp',
    'Images/Home-Page/apple-touch-icon.png',
    'Images/Home-Page/favicon-32x32.png',
    "Images/Home-Page/favicon-16x16.png",
    'Images/Home-Page/movie.webp',
    'Images/Home-Page/pic1.webp',
    'Images/Home-Page/pic2.webp',
    'Images/Home-Page/pic3.webp',
    'Images/Home-Page/pic4.webp',
    'Images/Home-Page/pic5.webp',
    'Images/Home-Page/pic6.webp',
    'Images/Home-Page/a.webp',
    'Images/Home-Page/b.webp',
    'Images/Home-Page/c.webp',
    'Images/Home-Page/d.webp',
    'Images/Home-Page/e.webp',
    'Images/Home-Page/f.webp',
    'Images/Footer-Images/fb.svg',
    'Images/Footer-Images/twitter.svg',
    'Images/Footer-Images/link.svg',
    'Images/Footer-Images/instagram.svg',
    'Images/Qualification-Page/home.svg',
    'Images/Qualification-Page/mail.svg',
    'Images/Qualification-Page/phone.svg',
    'Images/Qualification-Page/myself.webp',
    'Images/Qualification-Page/Person1.webp',
    'Images/Qualification-Page/Person2.webp',
    'Images/Skill-Page/cssexample1.webp',
    'Images/Skill-Page/cssexample2.webp',
    'Images/Skill-Page/CS-Banner1.png',
    'Images/Skill-Page/AI.webp',
    'Images/Skill-Page/siri.webp',
    'Images/Coffee-Page/coffeep1.webp',
    'Images/Coffee-Page/coffeep2.webp',
    'Images/Coffee-Page/latte.png',
    'Images/Coffee-Page/cappuchino.png',
    'Images/Coffee-Page/fwhite.png',
    'Images/Coffee-Page/espresso.png',
    'Images/Coffee-Page/americano.png'];
    



self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Woker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});


self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName && cacheName !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });




    //add all URLs to cache when installed
//...
//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
  });
  