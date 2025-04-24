import { Events } from "discord.js";
import { EventListener } from "../../EventListener";
import CubismClient from "../../../structures/CubismClient";

export default class ReadyEventListener extends EventListener {
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
