import { Client, ClientEvents, Collection, GatewayIntentBits, REST, Routes } from "discord.js";
import { Command, CommandInteractionOptions } from "../builders/Command";
import dotenv from "dotenv";
import process from "node:process";
import fs from "fs";
import path from "node:path";
import { Event, EventCreatorOptions } from "../builders/Event";
import convertCommandsInJSON from "../utils/convertCommandsInJSON";

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

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
			body: convertCommandsInJSON(this.commands.filter((command) => !command.testOnly)),
		});

		console.log(
			`${convertCommandsInJSON(this.commands.filter((command) => !command.testOnly)).length} published commands uploaded.`,
		);

		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
			body: convertCommandsInJSON(this.commands.filter((command) => command.testOnly)),
		});

		console.log(
			`${convertCommandsInJSON(this.commands.filter((command) => command.testOnly)).length} testing commands uploaded.`,
		);
	}

	async registerEvents() {
		const eventsPath = path.join(__dirname, "../events");
		const files = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

		for (const file of files) {
			const path = `../events/${file}`;
			const module = require(path);
			const event: Event<EventCreatorOptions> = new module.default();

			if (!event || !event.name) continue;

			const execute = (...args: any) => event.execute(...args);

			if (event.once) this.#client.once(event.name as keyof ClientEvents, execute);
			else this.#client.on(event.name as keyof ClientEvents, execute);
		}
	}
}

export default new CubismClient();
