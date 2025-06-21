import { ChatInputCommandInteraction } from "discord.js";
import { SetupInteractionCommand } from "../../interactions/commands/setup.js";
import { Command } from "@adobly/framework";

export class SetupCommand extends Command<typeof SetupInteractionCommand> {
	constructor() {
		super(SetupInteractionCommand);
	}

	override chatInput(_interaction: ChatInputCommandInteraction) {}
}

export default SetupCommand;
