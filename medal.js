// require('dotenv').config()

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Medal API Key: ', function (key) {
    process.env.KEY = String(key);
    rl.question('Medal User ID: ', function (user) {
        process.env.USERID = String(user);
        rl.question('Discord Webhook URL: ', function (user) {
            process.env.WEBHOOK = String(user);
            rl.close();
            console.log('\n\nSETUP ENV CORRECTLY, STARTING MEDAL LISTENER!')
            try {
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
            } catch (error) {
                console.log(error)
            }

        });
    });
});

