const { Medal } = require('medal-js');
const { Webhook } = require('simple-discord-webhooks');
const Conf = require('conf');
const config = new Conf({cwd: '.'});
const prompt = require('prompt');

let configSchema = {
    properties: {
        key: {
            description: 'Medal.tv API Key (pub/private)',
            required: true
        },
        user: {
            description: 'Medal.tv User ID',
            required: true
        },
        webhook: {
            description: 'Discord Webhook URL',
            required: true
        },
        
    }
};


let KEY = config.get('KEY') || process.env.KEY;
let USERID = config.get('USERID') || process.env.USERID;
let WEBHOOK = config.get('WEBHOOK') || process.env.WEBHOOK;


if(!KEY && !USERID && !WEBHOOK) {
    prompt.message = '';
    prompt.start();
    prompt.get(configSchema, function (err, input) {
        if(err) throw new Error(err);
        KEY = input.key;
        USERID = input.user;
        WEBHOOK = input.webhook;
        config.set('KEY', input.key)
        config.set('USERID', input.user)
        config.set('WEBHOOK', input.webhook)
        prompt.emit('stop');
        console.log('[INFO] - Finished configuration, saving and starting..');
        mainThread();
    });
} else {
    console.log('[INFO] - Config found, skipping first time setup.\n\n')
    mainThread();
}


function mainThread() {
    const options = { userId: Number(USERID), limit: 1 };
    const medal = new Medal(KEY);
    const discord = new Webhook(WEBHOOK);
    (async () => {
        const i = await medal.latest(options);
        let firstClipObj = i.data.contentObjects[0];
    
        // Send out the latest tracked clip to the webhook.
        console.log('[INFO] - Latest clip ID: ', firstClipObj.contentId);
        discord.send(firstClipObj.directClipUrl);
    
        setInterval(() => {
            medal.latest(options).then((r) => {
                let clipNew = r.data.contentObjects[0];
    
                if (clipNew.contentId !== firstClipObj.contentId) {
                    firstClipObj = clipNew;
                    console.log('[ALERT] - New clip detected: ', clipNew.directClipUrl);
                    discord.send(clipNew.directClipUrl);
                }
            });
        }, Number(process.env.INTERVAL) || 30 * 1000);
    })();
}