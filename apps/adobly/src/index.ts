import { AdoblyClient } from "@adobly/framework";
import { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

export const client = new AdoblyClient({
	token: `${process.env.TOKEN}`,
	id: `${process.env.CLIENT_ID}`,
	testGuildId: `${process.env.GUILD_ID}`,
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.start();
