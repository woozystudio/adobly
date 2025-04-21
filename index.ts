import bot from "./structures/CubismClient.js";

try {
	bot.start();
	bot.registerCommands();
} catch (error) {
	console.error(error);
}
