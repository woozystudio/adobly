import bot from "./structures/CubismClient.js";

try {
	await bot.start();
} catch (error) {
	console.error(error);
}
