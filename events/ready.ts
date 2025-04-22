import { Events } from "discord.js";
import { Event, EventCreatorOptions } from "../builders/Event";
import CubismClient from "../structures/CubismClient";

export default class Ready extends Event<EventCreatorOptions> {
	constructor() {
		super({
			name: Events.ClientReady,
			once: true,
		});
	}

	override execute() {
		console.log(`Logged as ${CubismClient.client.user?.tag}`);
	}
}
