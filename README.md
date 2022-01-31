# medal-tv-discord-webhook
This package was created to pull a users latest video each time there is one published and push it to a Discord webhook with the link. This package is highly customizable as it's really just a super light framework for things in the future.

You need to obtain a Public or Private API Key from here https://docs.medal.tv/api.html#generate-an-api-key


# Requirements:


You can obtain your `USERID` by visiting a clip and going to the profile, in the URL will be the User ID


`process.env` key/value definitions

```
KEY="Medal API Key"
WEBHOOK="https://discord.com/webhook/url/here"
USERID=14235704
INTERVAL=15000 (Optional | Default: 15 seconds | Format: milliseconds)
```


# Usage:
You have two options, you can run from source by using the following below or run the respective executable from the public releases, if you choose to run this package from a prebuilt binary, everything has prompts.



Install and run manually:

```
npm i; npm start
```

# Example:
![](https://cdn.discordapp.com/attachments/918670717753630822/935240827230367784/ej54VGdljN7qojsRcSkb.png)