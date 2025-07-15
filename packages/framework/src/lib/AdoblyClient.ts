import { BitFieldResolvable, Client, Collection, GatewayIntentsString, PresenceData } from "discord.js";
import dotenv from "dotenv";
import { Command } from "./structures/Command.js";
import { CommandPayload } from "../types/Command.js";

export class AdoblyClient {
	public token: string;
	public id: string;
	public testGuildID: string;
	public intents: BitFieldResolvable<GatewayIntentsString, number> = [];
	public presence?: PresenceData;

	public commandsPath?: string;
	public eventsPath?: string;

	#client;

	public commands: Collection<string, Command<CommandPayload>> = new Collection();

	public constructor({
		token,
		id,
		testGuildId,
		intents,
		presence,
		commandsPath,
		eventsPath,
	}: {
		token: string;
		id: string;
		testGuildId: string;
		intents: BitFieldResolvable<GatewayIntentsString, number>;
		presence?: PresenceData;
		commandsPath?: string;
		eventsPath?: string;
	}) {
		this.#client = new Client({
			intents: intents,
		});

		this.id = id;
		this.token = token;
		this.testGuildID = testGuildId;
		this.presence = presence;
		this.commandsPath = commandsPath;
		this.eventsPath = eventsPath;

		dotenv.config();
	}

	get client() {
		return this.#client;
	}

	public async start(): Promise<void> {
		try {
			await this.#client.login(this.token);
			if (this.presence) {
				this.#client.user?.setPresence(this.presence as PresenceData);
			}
		} catch (error) {
			console.error("Failed to login:", error);
			process.exit(1);
		}
	}
}
