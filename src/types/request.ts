import { JSONValue } from './common'

/** Request to create or update a user */
export interface UpsertUserRequest {
    externalId?: string
    anonymousId?: string
    email?: string
    phone?: string
    timezone?: string
    locale?: string
    data?: Record<string, JSONValue>
}

/** Request to delete a user */
export interface DeleteUserRequest {
    externalId?: string
    anonymousId?: string
}

/** Request to create or update an organization */
export interface OrganizationRequest {
    externalId: string
    name?: string
    data?: Record<string, JSONValue>
}

/** Request to delete an organization */
export interface DeleteOrganizationRequest {
    externalId: string
}

/** Request to add a user to an organization */
export interface OrganizationUserRequest {
    organizationExternalId: string
    userExternalId: string
    data?: Record<string, JSONValue>
}

/** Request to remove a user from an organization */
export interface RemoveOrganizationUserRequest {
    organizationExternalId: string
    userExternalId: string
}

/** Event data for organization events */
export interface OrganizationEvent {
    organizationExternalId: string
    name: string
    data?: Record<string, JSONValue>
}

/** Event data for user events */
export interface UserEvent {
    name: string
    anonymousId?: string
    externalId?: string
    data?: Record<string, JSONValue>
}
