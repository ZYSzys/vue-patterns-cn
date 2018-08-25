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
    "revision": "0490e384e1bc9034ad2cf95da8e706a7"
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
    "url": "assets/js/4.0f297803.js",
    "revision": "d0aa43ae8315f283f5ad234ee2c01121"
  },
  {
    "url": "assets/js/5.c250a395.js",
    "revision": "28aad7787cb0fb03e6c721156012cba4"
  },
  {
    "url": "assets/js/app.61463889.js",
    "revision": "5fd21f03bdec6f46a2114fc2bdfe96b1"
  },
  {
    "url": "index.html",
    "revision": "da1cdfa859a7098a3afe47caec6f7816"
  },
  {
    "url": "patterns/index.html",
    "revision": "c800036a26b4aa49f6e01d19e1327e35"
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
