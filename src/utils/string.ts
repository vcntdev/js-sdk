import { JSONValue } from '../types'

export const camelToUnderscore = (key: string) => key.replace(/([A-Z])/g, "_$1").toLowerCase()

export function mapKeys(value: unknown): JSONValue {
    if (value === null || typeof value !== 'object') {
        return value as JSONValue
    }

    if (Array.isArray(value)) {
        return value.map((item) => mapKeys(item))
    }

    const newObj: Record<string, JSONValue> = {}
    for (const key in value) {
        const transformedKey = camelToUnderscore(key)
        const val = (value as Record<string, unknown>)[key]

        if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
            newObj[transformedKey] = mapKeys(val)
        } else if (Array.isArray(val)) {
            newObj[transformedKey] = val.map((item) => {
                if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
                    return mapKeys(item)
                }
                return item as JSONValue
            })
        } else {
            newObj[transformedKey] = val as JSONValue
        }
    }

    return newObj
}
