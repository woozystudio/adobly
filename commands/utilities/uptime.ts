import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "../Command.js";
import { UptimeInteractionCommand } from "../../interactions/uptime.js";
import CubismClient from "../../structures/CubismClient.js";

export class UptimeCommand extends Command<typeof UptimeInteractionCommand> {
	constructor() {
		super(UptimeInteractionCommand);
	}

	override chatInput(interaction: ChatInputCommandInteraction) {
		let days = Math.floor((CubismClient.client.uptime as number) / 86400000);
		let hours = Math.floor((CubismClient.client.uptime as number) / 3600000) % 24;
		let minutes = Math.floor((CubismClient.client.uptime as number) / 60000) % 60;
		let seconds = Math.floor((CubismClient.client.uptime as number) / 1000) % 60;

		const embed = new EmbedBuilder()
			.setTitle("Uptime")
			.setColor(0xa9d0ff)
			.setDescription(`${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec.`)
			.setTimestamp();

		interaction.reply({ embeds: [embed] });
	}
}

export default UptimeCommand;
