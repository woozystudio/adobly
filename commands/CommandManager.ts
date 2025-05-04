import { ChatInputCommandInteraction } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";
import { Command } from "./Command";
import PingCommand from "./utilities/ping";
import SetupTicketsCommand from "./utilities/setup-tickets";
import TestCommand from "./utilities/test";
import TimestampCommand from "./utilities/timestamp";
import { logger } from "../logger";
import UserInfoCommand from "./information/userinfo";
import { GuildInfoCommand } from "./information/guildinfo";
import AvatarCommand from "./information/avatar";
import LangCommand from "./utilities/lang";

export class CommandManager {
	commands: Command<CommandInteractionOptions>[] = [
		new PingCommand(),
		new UserInfoCommand(),
		new GuildInfoCommand(),
		new AvatarCommand(),

		/* Management */
		new LangCommand(),

		/* Tickets */
		new SetupTicketsCommand(),

		/* Dev Tools */
		new TimestampCommand(),

		/* Owner Tools */
		new TestCommand(),
	];

	getAllCommands() {
		return this.commands;
	}

	findCommand(name: string) {
		return this.getAllCommands().find((c) => c.name === name.toLowerCase()) ?? null;
	}

	async execute(interaction: ChatInputCommandInteraction) {
		const command = this.findCommand(interaction.commandName);

		try {
			await command?.chatInput(interaction);
		} catch (e) {
			logger.error(e);
		}
	}
}

export default new CommandManager();
