import DiscordEventManager from "./events/discord/DiscordEventManager.js";
import { logger } from "./logger.js";
import bot from "./structures/CubismClient.js";

try {
	bot.start();
	bot.registerCommands();
	new DiscordEventManager().subscribe();
} catch (error) {
	try {
		logger.error(error);
	} catch (e) {
		console.error(error);
	}
}
