importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');

addEventListener('fetch', function(event) {
  console.log(event.request.url);
})
