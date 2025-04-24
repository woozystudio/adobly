import DiscordEventManager from "./events/discord/DiscordEventManager.js";
import bot from "./structures/CubismClient.js";

try {
	bot.start();
	bot.registerCommands();
	new DiscordEventManager().subscribe();
} catch (error) {
	console.error(error);
}
