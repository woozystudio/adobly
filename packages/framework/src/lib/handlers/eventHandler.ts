import { ClientEvents } from "discord.js";
import { AdoblyClient } from "../AdoblyClient.js";
import { getEvents } from "../utils/getEvents.js";

export async function eventHandler(client: AdoblyClient) {
	try {
		const localEvents = await getEvents(client);

		for (const localEvent of localEvents) {
			if (localEvent.once) {
				client.client.once(localEvent.name, (...args: ClientEvents[keyof ClientEvents]) =>
					localEvent.execute(client, ...args),
				);
			} else {
				client.client.on(localEvent.name, (...args: ClientEvents[keyof ClientEvents]) =>
					localEvent.execute(client, ...args),
				);
			}
		}
	} catch (error) {
		console.error("Error loading events:", error);
	}
}
