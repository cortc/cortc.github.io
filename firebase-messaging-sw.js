// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "821062676642"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener('install', function() {
  console.log('install firebase messaging sw');
});

self.addEventListener('activate', function() {
  console.log('activate fireabase messaging sw');
  // registration.showNotification("activate", {
  //   title: 'activate',
  //   body: 'worker activate'
  // });
});

// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log(payload);
//   return self.registration.showNotification(payload.data.title, payload.data);
// });

self.addEventListener('push', function (payload) {
  console.log('sw push event');
  console.log(payload);
  return self.registration.showNotification(payload.data.title, payload.data);
});
