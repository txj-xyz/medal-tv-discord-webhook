// Check ENV Vars before starting.
if (!process.env.KEY || !process.env.WEBHOOK || !process.env.USERID) {
    throw new Error(
        JSON.stringify(
            {
                KEY: process.env.KEY || null,
                WEBHOOK: process.env.WEBHOOK || null,
                USERID: process.env.USERID || null,
            },
            null,
            2
        )
    );
}

const { Medal } = require('medal-js');
const { Webhook } = require('simple-discord-webhooks');
const discord = new Webhook(process.env.WEBHOOK);

const options = { userId: Number(process.env.USERID), limit: 1 };
const medal = new Medal(process.env.KEY);

(async () => {
    const i = await medal.latest(options);
    let firstClipObj = i.data.contentObjects[0];

    // Send out the latest tracked clip to the webhook.
    console.log('Latest clip ID: ', firstClipObj.contentId);
    discord.send(firstClipObj.directClipUrl);

    setInterval(() => {
        medal.latest(options).then((r) => {
            let clipNew = r.data.contentObjects[0];

            if (clipNew.contentId !== firstClipObj.contentId) {
                firstClipObj = clipNew;
                console.log('New clip detected: ', clipNew.directClipUrl);
                discord.send(clipNew.directClipUrl);
            }
        });
    }, Number(process.env.INTERVAL) || 30 * 1000);
})();
