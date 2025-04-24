import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../Command";
import { TimestampInteractionCommand } from "../../interactions/timestamp";

export class TimestampCommand extends Command<typeof TimestampInteractionCommand> {
	constructor() {
		super(TimestampInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction) {
		const date = interaction.options.getString("date");
		const time = interaction.options.getString("time");
		const format = interaction.options.getString("format");

		const dateResult = new Date(`${date} ${time}`).getTime() / 1000;

		await interaction.reply({
			content: "<t:" + dateResult + ":" + format + ">" + ` - \`<t:${dateResult}:${format}>\``,
			flags: MessageFlags.Ephemeral,
		});
	}
}

export default TimestampCommand;
