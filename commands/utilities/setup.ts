import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../Command.js";
import { SetupInteractionCommand } from "../../interactions/setup.js";

export class SetupCommand extends Command<typeof SetupInteractionCommand> {
	constructor() {
		super(SetupInteractionCommand);
	}

	override chatInput(_interaction: ChatInputCommandInteraction) {}
}

export default SetupCommand;
