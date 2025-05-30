import { ChatInputCommandInteraction } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";
import { Command } from "./Command";
import { logger } from "../logger";
import PingCommand from "./utilities/ping";
import TestCommand from "./utilities/test";
import TimestampCommand from "./utilities/timestamp";
import UserInfoCommand from "./information/userinfo";
import GuildInfoCommand from "./information/guildinfo";
import AvatarCommand from "./information/avatar";
import LangCommand from "./utilities/lang";
import BanCommand from "./moderation/ban";
import KickCommand from "./moderation/kick";
import UnbanCommand from "./moderation/unban";
import MuteCommand from "./moderation/mute";
import UnmuteCommand from "./moderation/unmute";
import SetupCommand from "./utilities/setup";
import UptimeCommand from "./utilities/uptime";
import { AutoRolesCommand } from "./autoroles/autoroles";

export class CommandManager {
	commands: Command<CommandInteractionOptions>[] = [
		/* Informaton */
		new PingCommand(),
		new UserInfoCommand(),
		new GuildInfoCommand(),
		new AvatarCommand(),

		/* Management */
		new LangCommand(),
		new UptimeCommand(),
		new SetupCommand(),

		/* Moderation */
		new BanCommand(),
		new KickCommand(),
		new UnbanCommand(),
		new MuteCommand(),
		new UnmuteCommand(),

		/* Systems */
		new AutoRolesCommand(),

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
