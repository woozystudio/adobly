import bot from "./structures/CubismClient.js";

try {
	bot.start();
	bot.registerCommands();
	bot.createEvents();
} catch (error) {
	console.error(error);
}
