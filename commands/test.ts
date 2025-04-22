import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command, CommandInteractionOptions } from "../builders/Command.js";

export class TestCommand extends Command<CommandInteractionOptions> {
	constructor() {
		super({
			name: "test",
			description: "Command to be used to test different features of the app.",
			type: ApplicationCommandType.ChatInput,
			testOnly: true,
		});
	}

	override execute(interaction: ChatInputCommandInteraction) {
		interaction.reply(`Everything working properly so far, ${interaction.user}! (3/3)`);
	}
}

export default TestCommand;
