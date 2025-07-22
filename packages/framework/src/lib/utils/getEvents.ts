import fs from "fs";
import { pathToFileURL } from "url";
import { EventPayload } from "../../types/Event.js";
import { AdoblyClient } from "../AdoblyClient.js";
import { Event } from "../structures/Event.js";
import { fileCondition } from "./fileCondition.js";
import { ClientEvents } from "discord.js";

export async function getEvents(client: AdoblyClient) {
	const localEvents: Event<EventPayload, keyof ClientEvents>[] = [];
	const eventsPath = client.eventsPath as string;

	const folders = fs.readdirSync(eventsPath);
	for (const folder of folders) {
		const files = fs.readdirSync(`${eventsPath}/${folder}`).filter(fileCondition);

		for (const fileName of files) {
			const modulePath = pathToFileURL(`${eventsPath}/${folder}/${fileName}`).href;
			const eventModule = await import(modulePath);
			const EventClass = eventModule.default;
			const event = new EventClass();
			localEvents.push(event);
		}
	}

	return localEvents;
}
