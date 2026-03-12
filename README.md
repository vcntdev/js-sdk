# Lunogram JS SDK

A type-safe JavaScript SDK for collecting events and managing users/organizations.

## Features

- **TypeScript First** — Full type safety with exported types
- **Namespaced API** — Organized `client.user.*` and `client.organization.*` methods
- **Extensible** — Factory pattern makes adding new API resources trivial
- **Error Handling** — Hierarchical error classes for granular error handling
- **Browser Ready** — Auto-injects `anonymousId`/`externalId` in browser environments

## Installation

```
npm install @lunogram/js-sdk
```

## Quick Start

```typescript
import { Lunogram } from '@lunogram/js-sdk'

const lunogram = new Lunogram('your-api-key')

// User operations
await lunogram.user.upsert({ email: 'user@example.com' })
await lunogram.user.events([{ name: 'user.signed_up', data: { plan: 'free' } }])

// Organization operations
await lunogram.organization.upsert({ externalId: 'org-123', name: 'Acme' })
```

## Usage

### Browser

The SDK automatically generates and persists an `anonymousId` for each user.

```typescript
import { BrowserClient } from '@lunogram/js-sdk'

const client = new BrowserClient({ apiKey: 'your-api-key' })

// anonymousId is auto-generated
client.user.anonymousId

await client.user.upsert({ externalId: 'user-123', email: 'user@example.com' })
await client.user.events([{ name: 'user.signed_up', data: {} }])

// externalId is set after upsert
client.user.externalId // 'user-123'
```

The SDK is also exposed on `window.Lunogram`:

```html
<script>
    const lunogram = new Lunogram('your-api-key')
    lunogram.user.events([{ name: 'user.signed_up', data: {} }])
</script>
```

### Server

```typescript
import { Client } from '@lunogram/js-sdk'

const client = new Client({
    apiKey: 'your-api-key',
    urlEndpoint: 'https://your-api.com/api' // optional
})

await client.user.upsert({ externalId: 'user-123', email: 'user@example.com' })
await client.organization.upsert({ externalId: 'org-456', name: 'Acme Corp' })
```
