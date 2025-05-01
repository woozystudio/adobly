import { Events } from "discord.js";
import { EventListener } from "../../EventListener";
import CubismClient from "../../../structures/CubismClient";
import { logger } from "../../../logger";
import i18next from "i18next";
import Backend from "i18next-fs-backend";

export default class ReadyEventListener extends EventListener {
	constructor() {
		super({
			name: Events.ClientReady,
			once: true,
		});
	}

	override execute() {
		logger.info(`Logged as ${CubismClient.client.user?.tag}`);

		i18next.use(Backend).init({
			backend: {
				loadPath: "locales/{{lng}}/{{ns}}.json",
			},
			cleanCode: true,
			preload: ["es-ES"],
			returnNull: false,
			returnEmptyString: false,
			interpolation: {
				escapeValue: false,
			},
		});

		logger.info("i18next translations loaded.");
	}
}
