import { Event, EventPayload } from "@adobly/framework";
import { ClientEvents, Events } from "discord.js";

export default class Ready extends Event<EventPayload, keyof ClientEvents> {
	public constructor() {
		super({
			name: Events.ClientReady,
			once: true,
		});
	}

	public async execute() {
		try {
			console.log(`Bot is ready!`);
		} catch (error) {
			console.error("Error during bot initialization:", error);
		}
	}
}
