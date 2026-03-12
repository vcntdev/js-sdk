# Lunogram JS SDK

A type-safe JavaScript SDK for collecting events and managing users/organizations.

## Features

- **TypeScript First** - Full type safety with exported types
- **Namespaced API** - Organized `client.user.*` and `client.organization.*` methods
- **Extensible** - Factory pattern makes adding new API resources trivial
- **Error Handling** - Hierarchical error classes for granular error handling
- **Browser Ready** - Auto-injects anonymousId/externalId in browser environments

## Quick Links

- [Getting Started](./getting-started.md)
- [Architecture](./architecture.md)
- [Extending the SDK](./extending.md)

## Basic Usage

```typescript
import { Lunogram } from '@lunogram/js-sdk'

const lunogram = new Lunogram('your-api-key')

// User operations
await lunogram.user.upsert({ email: 'user@example.com' })
await lunogram.user.postEvents([{ name: 'user.signed_up', data: { plan: 'free' } }])

// Organization operations  
await lunogram.organization.upsert({ externalId: 'org-123', name: 'Acme' })
await lunogram.organization.addUser({ organizationExternalId: 'org-123', userExternalId: 'user-456' })
await lunogram.organization.removeUser({ organizationExternalId: 'org-123', userExternalId: 'user-456' })
await lunogram.organization.postEvents([{ organizationExternalId: 'org-123', name: 'org.upgraded', data: { plan: 'enterprise' } }])
```

For detailed parameter definitions, see the [Live API Documentation](https://console.lab.lunogram.io/api#client).
