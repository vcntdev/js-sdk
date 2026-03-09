import { ClientProps, TrackProps, EventProps, IdentifyProps, AliasProps, InternalPayload } from '../types'
import { DefaultEndpoint } from './constants'
import { mapKeys } from '../utils'

export class Client {
    #apiKey: string
    #urlEndpoint: string

    constructor(props: ClientProps) {
        this.#apiKey = props.apiKey
        this.#urlEndpoint = props.urlEndpoint ?? DefaultEndpoint
    }

    async track({ properties: data, ...props }: TrackProps) {
        return await this.#request('track', { ...props, data })
    }

    async events(props: EventProps[]) {
        const payload: InternalPayload[] = props.map(({ properties: data, ...rest }) => ({
            ...rest,
            data: data ?? {},
        }))

        return await this.#request('events', payload)
    }

    async identify({ traits: data, ...props }: IdentifyProps) {
        return await this.#request('identify', { ...props, data })
    }

    async alias(props: AliasProps) {
        const payload: InternalPayload = {
            anonymousId: props.anonymousId,
            externalId: props.externalId,
        }

        return await this.#request('identify', payload)
    }

    async #request(path: string, data: InternalPayload | InternalPayload[]) {
        try {
            const response = await fetch(`${this.#urlEndpoint}/client/${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.#apiKey}`,
                },
                body: JSON.stringify(mapKeys(data)),
            })

            if (!response.ok) {
                const errorBody = await response.text().catch(() => 'Unknown error body')
                throw new Error(`Request failed with status ${response.status}: ${errorBody}`)
            }

            return await response.text()
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            throw new Error(`Lunogram: Network request failed: ${message}`)
        }
    }
}
