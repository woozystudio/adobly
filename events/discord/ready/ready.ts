import { Events } from "discord.js";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { EventListener, logger } from "@adobly/framework";
import { client } from "../../..";

export default class ReadyEventListener extends EventListener {
	constructor() {
		super({
			name: Events.ClientReady,
			once: true,
		});
	}

	override execute() {
		logger.info(`Logged as ${client.client.user?.tag}`);

		i18next.use(Backend).init({
			backend: {
				loadPath: "locales/{{lng}}/{{ns}}.json",
			},
			cleanCode: true,
			preload: ["es-ES", "en-US", "fr-FR"],
			returnNull: false,
			returnEmptyString: false,
			interpolation: {
				escapeValue: false,
			},
		});

		logger.info("i18next translations loaded.");
	}
}
