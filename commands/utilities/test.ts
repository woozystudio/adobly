import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction } from "discord.js";
import { TestInteractionCommand } from "../../interactions/commands/test.js";
import { Command } from "@adobly/framework";

export class TestCommand extends Command<typeof TestInteractionCommand> {
	constructor() {
		super(TestInteractionCommand);
	}

	override chatInput(interaction: ChatInputCommandInteraction) {
		// interaction.reply(`Everything working properly so far, ${interaction.user}! (3/3)`);

		interaction.reply({
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder().setCustomId("test").setLabel("Testing").setStyle(ButtonStyle.Success),
				),
			],
		});
	}
}

export default TestCommand;
