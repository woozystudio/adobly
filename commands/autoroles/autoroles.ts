import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../Command.js";
import { AutoRolesInteractionCommand } from "../../interactions/autoroles";

export class AutoRolesCommand extends Command<typeof AutoRolesInteractionCommand> {
	constructor() {
		super(AutoRolesInteractionCommand);
	}

	override chatInput(_interaction: ChatInputCommandInteraction) {}
}

export default new AutoRolesCommand();
