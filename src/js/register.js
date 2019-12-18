function registerServiceWorker() {
    navigator.serviceWorker
        .register("../../sw.js")
        .then(() => {
            console.log("Hooray! Service Worker has been registered!");
        })
        .catch(() => {
            console.log("Oops! Service Worker failed in registration!");
        });
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === "denied") {
                console.log("Oops! Notification has been denied");
                return;
            } else if (result === "default") {
                console.error("No permission for notification");
                return;
            }
            if (('PushManager' in window)) {

                // ---- Untuk subscribe ----

                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BK2mD2zP49LWd7ll1aJaIvH0XbsOxFhK18yK05-9sGXDB5Tog7rqyStn0a-t6tTFqklATaNqLYn6AwbeOc_Zaac")
                        // applicationServerKey: "BK2mD2zP49LWd7ll1aJaIvH0XbsOxFhK18yK05-9sGXDB5Tog7rqyStn0a-t6tTFqklATaNqLYn6AwbeOc_Zaac"
                    }).then(function(subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });

                // ---- Untuk Unsubscribe ----

                // navigator.serviceWorker.ready.then(function(reg) {
                //     reg.pushManager.getSubscription().then(function(subscription) {
                //         subscription.unsubscribe().then(function(successful) {
                //             console.log("Unsubscribe berhasil");
                //         }).catch(function(e) {
                //             console.log("Unsubscribe gagal");
                //         })
                //     })        
                // });
            }
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        registerServiceWorker();
        requestPermission();
    });
} else {
    console.log("Sorry! Service Worker is not supported by this browser!");
}