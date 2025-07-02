import { ClientEvents } from "discord.js";
import { EventManager } from "@adobly/framework";
import ReadyEventListener from "./ready/ready.js";
import InteractionCreateEventListener from "./interactionCreate/interactionCreate.js";
import { client } from "../../index.js";

export default class DiscordEventManager extends EventManager {
	public override subscribe() {
		for (const eventListener of this.getEventListeners()) {
			client.client.on(eventListener.name as keyof ClientEvents, this.notifyEventListener.bind(this, eventListener));
		}
	}

	public override getEventListeners() {
		return [
			new ReadyEventListener(),

			/* Interactions */
			new InteractionCreateEventListener(),
		];
	}
}
