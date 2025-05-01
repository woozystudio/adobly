import { ClientEvents } from "discord.js";
import CubismClient from "../../structures/CubismClient";
import EventManager from "../EventManager";
import ReadyEventListener from "./ready/ready";
import InteractionCreateEventListener from "./interactionCreate/interactionCreate";

export default class DiscordEventManager extends EventManager {
	public override subscribe() {
		for (const eventListener of this.getEventListeners()) {
			CubismClient.client.on(
				eventListener.name as keyof ClientEvents,
				this.notifyEventListener.bind(this, eventListener),
			);
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
