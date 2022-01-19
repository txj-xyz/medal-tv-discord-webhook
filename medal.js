// Check ENV Vars before starting.
if (!process.env.KEY || !process.env.WEBHOOK) {
    throw new Error({
        KEY: process.env.KEY || null,
        WEBHOOK: process.env.WEBHOOK || null,
    });
}

const { Medal } = require('medal-js');
const { Webhook } = require('simple-discord-webhooks');
const discord = new Webhook(process.env.WEBHOOK);

const options = { userId: 14235704, limit: 1 };
const medal = new Medal(process.env.KEY);

(async () => {
    const i = await medal.latest(options);
    const initialCheckObject = i.data.contentObjects[0];

    // Send out the latest tracked clip to the webhook.
    discord.send(initialCheckObject.directClipUrl);

    setInterval(() => {
        medal.latest(options).then((r) => {
            const latestCheckObject = r.data.contentObjects[0];

            switch (true) {
                case initialCheckObject.contentId !== latestCheckObject.contentId:
                    console.log('New clip detected: ', latestCheckObject.directClipUrl);
                    discord.send(latestCheckObject.directClipUrl);
                    break;

                default:
                    break;
            }
        });
    }, Number(process.env.INTERVAL) || 30 * 1000);
})();
