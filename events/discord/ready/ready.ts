import { Events } from "discord.js";
import { EventListener } from "../../EventListener";
import CubismClient from "../../../structures/CubismClient";
import { logger } from "../../../logger";

export default class ReadyEventListener extends EventListener {
	constructor() {
		super({
			name: Events.ClientReady,
			once: true,
		});
	}

	override execute() {
		logger.info(`Logged as ${CubismClient.client.user?.tag}`);
	}
}
