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
    )
    setNameForUser(id: string, name: string)
    trackRoom(name: string, props: Partial<{deckName: string}>)
}

export class MixpanelTrackingService implements ITrackingService {
    private readonly mixpanel?: Mixpanel.Mixpanel

    constructor() {
        const token = process.env.MIXPANEL_TOKEN
        if (token == null) {
            logger.warn('MIXPANEL_TOKEN is not available, tracking disabled')
            return
        }
        logger.info(`Started MIXPANEL tracking service`)
        this.mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN)
    }

    trackEvent(
        event: TrackingEvents,
        properties: Partial<{ distinct_id: string, ip: string, roomId: string, leavingReason: string }>
    ) {
        logger.debug({
            ...properties,
            event,
            msg: `Sending event ${event}`
        })
        this.mixpanel?.track(event, properties)
    }

    setNameForUser(id:string, name:string) {
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

    trackRoom(name: string, props: Partial<{deckName: string}> = {}) {
        this.mixpanel?.groups.set('Room', name, {
            $name: name,
            last_visited: (new Date()).toISOString(),
            ...props
        })
    }

}
