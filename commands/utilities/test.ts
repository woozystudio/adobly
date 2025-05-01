import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../Command.js";
import { TestInteractionCommand } from "../../interactions/test.js";

export class TestCommand extends Command<typeof TestInteractionCommand> {
	constructor() {
		super(TestInteractionCommand);
	}

	override chatInput(interaction: ChatInputCommandInteraction) {
		interaction.reply(`Everything working properly so far, ${interaction.user}! (3/3)`);
	}
}

export default TestCommand;
