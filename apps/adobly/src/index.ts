import { AdoblyClient } from "@adobly/framework";
import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const commandsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "commands");
const eventsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "events");

export const client = new AdoblyClient({
	/* Bot Configuration */
	token: `${process.env.TOKEN}`,
	id: `${process.env.CLIENT_ID}`,
	testGuildId: `${process.env.GUILD_ID}`,
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],

	/* Handler Configuration */
	commandsPath: commandsPath,
	eventsPath: eventsPath,
});

client.start();
