import { ChatInputCommandInteraction } from "discord.js";
import { AutoRolesInteractionCommand } from "../../interactions/commands/autoroles";
import { Command } from "@adobly/framework";

export class AutoRolesCommand extends Command<typeof AutoRolesInteractionCommand> {
	constructor() {
		super(AutoRolesInteractionCommand);
	}

	override chatInput(_interaction: ChatInputCommandInteraction) {}
}

export default new AutoRolesCommand();
