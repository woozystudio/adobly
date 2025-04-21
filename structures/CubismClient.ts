import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { Command, CommandInteractionOptions } from "../builders/Command";
import dotenv from "dotenv";
import process from "node:process";
import fs from "fs";
import path from "node:path";

export class CubismClient {
	#client;

	public commands: Collection<string, Command<CommandInteractionOptions>> = new Collection();

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
		this.#client.login(process.env.TOKEN);
	}

	async registerCommands() {
		const commandsPath = path.join(__dirname, "../commands");
		const files = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

		for (const file of files) {
			const path = `../commands/${file}`;
			const module = require(path);
			const command: Command<CommandInteractionOptions> = new module.default();

			if (!command || !command.name) continue;

			this.commands.set(command.name, command);
		}

		const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
			body: this.convertCommandsInJSON(this.commands),
		});
	}

	async createEvents() {
		this.#client.on(Events.ClientReady, () => {
			console.log(`Logged as ${this.#client.user?.tag}`);
		});

		this.#client.on(Events.InteractionCreate, (interaction) => {
			if (!interaction.isChatInputCommand()) return;

			const command = this.commands.get(interaction.commandName);

			if (!command) return;

			return command.execute(interaction);
		});
	}

	private convertCommandsInJSON(commands: Collection<string, Command<CommandInteractionOptions>>): object[] {
		const data: object[] = [];

		commands.forEach((command) => {
			data.push({
				name: command.name,
				description: command.description,
				type: command.type,
			});
		});

		return data;
	}
}

export default new CubismClient();
