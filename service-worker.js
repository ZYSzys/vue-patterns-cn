/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "da166a718645b4260b4075a7975fff89"
  },
  {
    "url": "assets/css/0.styles.9c794f19.css",
    "revision": "a3491c6d33b09433f1cf4a3261591677"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.6dda9b1b.js",
    "revision": "62743958309dab2c52ea9a790514ef3b"
  },
  {
    "url": "assets/js/4.284c9738.js",
    "revision": "2113b1fb39cb16972c74b0acb55c6c55"
  },
  {
    "url": "assets/js/5.0507d049.js",
    "revision": "19b6af9ba06eccc7ee3611fd80664c4a"
  },
  {
    "url": "assets/js/6.9890a97b.js",
    "revision": "9de5a7104e9a3a0b0984db4194e54e5c"
  },
  {
    "url": "assets/js/7.216e1a50.js",
    "revision": "f7d6cdd3aa080ef309a7bb57d9b74189"
  },
  {
    "url": "assets/js/8.88866b21.js",
    "revision": "c9bf4a15bffbf2032d42292cbb05505e"
  },
  {
    "url": "assets/js/app.45949994.js",
    "revision": "cf18adb4eef0d42bfca55028f6a79cea"
  },
  {
    "url": "index.html",
    "revision": "aa9ff421810a049dbd6f5962eadeb1cb"
  },
  {
    "url": "learn-vue-logo.png",
    "revision": "377227e84682319c70fa353280fb8deb"
  },
  {
    "url": "patterns/index.html",
    "revision": "81884a73c845d0748c19e620ea67e72e"
  },
  {
    "url": "sponsors/index.html",
    "revision": "de6a6818cc871fa31eed63f969542063"
  },
  {
    "url": "useful-links/index.html",
    "revision": "9c1a078eacedec9bb8df12fa71867177"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
