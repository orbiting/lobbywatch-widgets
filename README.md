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

Goto https://app.keycdn.com/zones/purgeurl/136385 and enter:

```
/s3/republik-assets/dynamic-components/lobbywatch-widgets/table.js
```

If you change asset files be sure to purge those too.

### Generate Data for Lobbygroup Table

https://lobbywatch.ch/graphiql

```gql
query getLobbyGroup($locale: Locale!, $id: ID!) {
  getLobbyGroup(locale: $locale, id: $id) {
    __typename
    updated
    published
    id
    name
    sector
    description
    commissions {
      name
      abbr
    }
    connections {
      group
      to {
        __typename
        ... on Organisation {
          id
          name
        }
        ... on Parliamentarian {
          id
          name
        }
      }
      vias {
        __typename
        to {
          ... on Organisation {
            id
            name
          }
          ... on Guest {
            id
            name
          }
        }
      }
    }
  }
}
```

```json
{
  "locale": "de",
  "id": "2"
}
```

```js
const index = r.data.getLobbyGroup.connections.filter(d => d.to.__typename === 'Parliamentarian').filter(d => d.vias.length === 1).reduce(
  (index, d) => {
    index[d.to.name] = index[d.to.name] || []
    index[d.to.name].push(d)
    return index 
  },
  {}
)

copy(Object.keys(index).map(key => ({
  name: key,
  values: index[key].map(d => d.vias[0].to.name)
})))
```

