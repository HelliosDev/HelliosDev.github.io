try {
    const webPush = require('web-push');

    const vapidKeys = {
        "publicKey": "BK2mD2zP49LWd7ll1aJaIvH0XbsOxFhK18yK05-9sGXDB5Tog7rqyStn0a-t6tTFqklATaNqLYn6AwbeOc_Zaac",
        "privateKey": "SbOjj4_ZkC8POMT0_dM2hpf_6dyZUmLPanbMALSx2Rs"
    };

    webPush.setVapidDetails(
        'mailto:example@yourdomain.org',
        vapidKeys.publicKey,
        vapidKeys.privateKey
    )

    const pushSubscription = {
        "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABd-apToHG6D12l9MjRkPChVfacr-xAJ4UT3Vb2ud0HHzXmnzFTK0ucPfGFlQnNLEGjnACs-LQ73zb4euIg3DeEV-KvPuIY_YjfBz9g4ihZC98lqY1YHNOHZkhJk-NGBn0BPXfHqBHBlqYAEz32kCakYrAQ0AkBfTC6wLvTLUZo_BvZG_U",
        "keys": {
            "p256dh": "BICSyoT2MyEqpm3RwZKMDWGXEVf86ZtwbaHT+ngz05GYOd25nUPo1S4AzJR8gplYAwOcOPYyrwqsnofMQjmODHE=",
            "auth": "LEznF8ia8jWptf2XsCtLCw=="
        }
    };

    const payload = 'Yeay! Push Notification from Football PWA';

    const options = {
        gcmAPIKey: 'AIzaSyCYu0CoSwddhMzr0Au1Gp5MuleeerPyhkA',
        TTL: 60
    };

    webPush.sendNotification(
        pushSubscription,
        payload,
        options
    ).catch(err => {
        console.log(err);
    });
} catch (error) {
    console.log(error);
}