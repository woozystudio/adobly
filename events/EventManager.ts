import { logger } from "../logger";

export default class EventManager {
	public getEventListeners() {}

	public subscribe() {}

	async notifyEventListener(eventListener: { execute: (...args: any[]) => any }, ...args: any[]) {
		try {
			await eventListener.execute(...args);
		} catch (error) {
			logger.error(error);
		}
	}
}
