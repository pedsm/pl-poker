import Mixpanel from 'mixpanel'
import logger from './logger'

export enum TrackingEvents {
    ROOM_CREATED='room_created',
    ROOM_JOINED='room_joined',
    ROOM_LEFT='room_left',
    CLEAR_TABLE='clear_table',
    CHANGE_NAME='change_name',
    FLIP_ALL='flip_all',
    CHANGE_DECK='change_deck'
}

export interface ITrackingService {
    trackEvent(
        event: TrackingEvents,
        properties: Partial<{ distinct_id: string, ip: string, roomId: string, leavingReason: string, deckName: string }>
    ): Promise<void>
    setNameForUser(id: string, name: string): Promise<void>
    trackRoom(name: string, props: Partial<{deckName: string}>): Promise<void>
}

export class MixpanelTrackingService implements ITrackingService {
    private readonly mixpanel?: Mixpanel.Mixpanel 
    private cloudProvider?: string

    constructor() {
        const token = process.env.MIXPANEL_TOKEN
        if (token == null) {
            logger.warn('MIXPANEL_TOKEN is not available, tracking disabled')
            return
        }
        logger.info(`Started MIXPANEL tracking service`)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN!)
        this.cloudProvider = process.env.CLOUD_PROVIDER ?? 'oops'
    }

    async trackEvent(
        event: TrackingEvents,
        properties: Partial<{ distinct_id: string, ip: string, roomId: string, leavingReason: string }>
    ) {
        logger.debug({
            ...properties,
            event,
            msg: `Sending event ${event}`,
            cloudProvider: this.cloudProvider
        })
        this.mixpanel?.track(event, { ...properties, cloudProvider: this.cloudProvider })
    }

    async setNameForUser(id:string, name:string) {
        logger.debug({
            msg: `Setting name`,
            id,
            name,
        })
        this.mixpanel?.people.set(
            id, {
                '$first_name': name,
                'last_visited': (new Date()).toISOString()
            }
        )
    }

    async trackRoom(name: string, props: Partial<{deckName: string}> = {}) {
        this.mixpanel?.groups.set('Room', name, {
            $name: name,
            last_visited: (new Date()).toISOString(),
            ...props
        })
    }

}