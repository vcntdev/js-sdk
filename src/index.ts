import { BrowserClient } from './platform/browser'
import { ClientProps, TrackProps, EventProps, IdentifyProps, AliasProps } from './types'

export * from './core/client'
export * from './platform/browser'
export * from './types'
export * from './utils'

export class Lunogram {
    static instance?: BrowserClient = undefined

    static initialize(props: ClientProps) {
        Lunogram.instance = new BrowserClient(props)
    }

    static get #client(): BrowserClient {
        if (!Lunogram.instance) {
            throw new Error('Lunogram: SDK must be initialized with .initialize(props) before use.')
        }
        return Lunogram.instance
    }

    static async track(props: TrackProps) {
        return await Lunogram.#client.track(props)
    }

    static async events(props: EventProps[]) {
        return await Lunogram.#client.events(props)
    }

    static async identify(props: IdentifyProps) {
        return await Lunogram.#client.identify(props)
    }

    static async alias(props: AliasProps) {
        return await Lunogram.#client.alias(props)
    }
}

// If running in a browser, expose Lunogram from the window object
declare global {
    interface Window { Lunogram: typeof Lunogram; }
}

if (typeof window !== 'undefined') {
    window.Lunogram = Lunogram
}
