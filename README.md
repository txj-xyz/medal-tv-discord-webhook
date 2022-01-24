# medal-tv-discord-webhook
This package was created to pull a users latest video each time there is one published and push it to a Discord webhook with the link. This package is highly customizable as it's really just a super light framework for things in the future.

You neeed to obtain a Public or Private API Key from here https://docs.medal.tv/api.html#generate-an-api-key


# Requirements:

You can obtain your `USERID` by visiting a clip and going to the profile, in the URL will be the User ID

```
KEY="Medal API Key"
WEBHOOK="https://discord.com/webhook/url/here"
USERID=14235704
INTERVAL=15000 (Optional | Default: 15 seconds | Format: milliseconds)
```


# Usage:

```
npm i; npm start
```

# Docker:

```
docker build -t medal-tv-discord-webhook:latest .
docker run -d medal-tv-discord-webhook:latest
```
