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
        "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABd-4A_FA2i7tvTqSJEvPNnr91-UE66_AFBrMvBm8V8cKIpMDNUL0PqxZzQSu77gBGibnrEBBscnrh-3x1nGQ9km28PmFQ8eSihOZgymnGyEgzhZahqVPdp2X8I_dgfJ9tfJWZpZXxw8JTTk9YBerS5Y684FfRR0BlM1O4NqtW-Vge6vfc",
        "keys": {
            "p256dh": "BOUv2aXJbI6Y7DTsXS3SMD13Kf2bmlI4m0e3EhR7xtS3bESx8lJR5pZO+CDz8NfdXvP6wFVZoYAD4ygyHNFvZuU=",
            "auth": "7bLPOFbka3kCLHNw3lc6YQ=="
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