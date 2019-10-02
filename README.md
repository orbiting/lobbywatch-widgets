### Develop

```bash
npm i
npm run dev:code
# run in seperate tab/window
npm run dev:server
open http://localhost:3000/
```

### Deploy

```bash
npm run build
npm run deploy
```

### Clear CDN

Goto https://app.keycdn.com/zones/purgeurl/87880 and enter:

```
/s3/republik-assets/dynamic-components/lobbywatch-widgets/table.js
```

If you change asset files be sure to purge those too.
