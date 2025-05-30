import { ChatInputCommandInteraction } from "discord.js";
import { SubCommandInteractionOptions } from "../types/SubCommand";
import { SubCommand } from "./SubCommand";
import { logger } from "../logger";
import SetupMuteSubCommand from "./utilities/sub/setup-mute";
import SetupTicketsSubCommand from "./utilities/sub/setup-tickets";
import SetupAutoRolesSubCommand from "./autoroles/setup-autoroles";
import { AutoRolesAddSubCommand } from "./autoroles/sub/add";
import { AutoRolesRemoveSubCommand } from "./autoroles/sub/remove";

export class SubCommandManager {
	subCommands: SubCommand<SubCommandInteractionOptions>[] = [
		/* Setup */
		new SetupMuteSubCommand(),
		new SetupTicketsSubCommand(),
		new SetupAutoRolesSubCommand(),

		/* AutoRoles */
		new AutoRolesAddSubCommand(),
		new AutoRolesRemoveSubCommand(),
	];

	getAllCommands() {
		return this.subCommands;
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

export default new SubCommandManager();
