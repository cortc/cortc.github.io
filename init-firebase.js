navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' })
  .then(function(reg) {
    console.log('[Companion]', 'Service worker registered!');
  });

const firebaseConfig = {
  messagingSenderId: "821062676642"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.messaging = firebase.messaging();

function subscribe() {
    // запрашиваем разрешение на получение уведомлений
    messaging.requestPermission()
        .then(function () {
            // получаем ID устройства
            messaging.getToken()
                .then(function (currentToken) {
                    console.log(currentToken);

                    if (currentToken) {
                        // sendTokenToServer(currentToken);
                    } else {
                        console.warn('Не удалось получить токен.');
                        // setTokenSentToServer(false);
                    }
                })
                .catch(function (err) {
                    console.warn('При получении токена произошла ошибка.', err);
                    // setTokenSentToServer(false);
                });
    })
    .catch(function (err) {
        console.warn('Не удалось получить разрешение на показ уведомлений.', err);
    });
}
