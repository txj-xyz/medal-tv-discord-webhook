# medal-tv-discord-webhook
This package was created to pull the latest video from a User ID provided via Environment Variables to run in Docker and push the latest video to a Discord webhook.
# Requirements:


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
