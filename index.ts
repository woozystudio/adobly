import bot from "./structures/CubismClient.js";

try {
	bot.start();
	bot.registerCommands();
	bot.registerEvents();
} catch (error) {
	console.error(error);
}
