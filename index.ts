import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import process from "node:process";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

config();

async function start() {
	client.login(process.env.TOKEN).then(() => {
		console.log(`Logged as ${client.user?.tag}`);
	});
}

start();
