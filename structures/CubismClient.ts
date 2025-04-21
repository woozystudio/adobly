import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

export class CubismClient {
	#client;

	public constructor() {
		this.#client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
			],
		});

		dotenv.config();
	}

	get client() {
		return this.#client;
	}

	public start() {
		this.#client.login(process.env.TOKEN).then(() => {
			console.log(`Logged as ${this.#client.user?.tag}`);
		});
	}
}

export default new CubismClient();
