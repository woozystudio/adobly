import { ActivityType, Client, Collection, GatewayIntentBits, PresenceUpdateStatus, REST, Routes } from "discord.js";
import { Command } from "../commands/Command";
import type { CommandInteractionOptions } from "../types/Command";
import dotenv from "dotenv";
import process from "node:process";
import convertCommandsInJSON from "../utils/convertCommandsInJSON";
import CommandManager from "../commands/CommandManager";
import { logger } from "../logger";
import { connect } from "mongoose";

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
			presence: {
				activities: [{ name: "woozystudio.com", type: ActivityType.Custom }],
				status: PresenceUpdateStatus.Idle,
			},
		});

		dotenv.config();
	}

	get client() {
		return this.#client;
	}

	public start() {
		this.#client.login(process.env.TOKEN);
		connect(`${process.env.MONGO_URI}`, { appName: "adobly-v1" }).then(() => {
			logger.info("MongoDB database connected.");
		});
	}

	async registerCommands() {
		CommandManager.commands.forEach((command) => {
			this.commands.set(command.name, command);
		});

		const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
			body: convertCommandsInJSON(this.commands.filter((command) => !command.testOnly)),
		});

		logger.info(
			`${convertCommandsInJSON(this.commands.filter((command) => !command.testOnly)).length} published commands uploaded.`,
		);

		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
			body: convertCommandsInJSON(this.commands.filter((command) => command.testOnly)),
		});

		logger.info(
			`${convertCommandsInJSON(this.commands.filter((command) => command.testOnly)).length} testing commands uploaded.`,
		);
	}
}

export default new CubismClient();
