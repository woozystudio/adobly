import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { UptimeInteractionCommand } from "../../interactions/commands/uptime.js";
import { AdoblyClient, Command } from "@adobly/framework";

export class UptimeCommand extends Command<typeof UptimeInteractionCommand> {
	constructor() {
		super(UptimeInteractionCommand);
	}

	override chatInput(interaction: ChatInputCommandInteraction, _locale: string, bot: AdoblyClient) {
		let days = Math.floor((bot.client.uptime as number) / 86400000);
		let hours = Math.floor((bot.client.uptime as number) / 3600000) % 24;
		let minutes = Math.floor((bot.client.uptime as number) / 60000) % 60;
		let seconds = Math.floor((bot.client.uptime as number) / 1000) % 60;

		const embed = new EmbedBuilder()
			.setTitle("Uptime")
			.setColor(0xa9d0ff)
			.setDescription(`${days} days, ${hours} hrs, ${minutes} min, ${seconds} sec.`)
			.setTimestamp();

		interaction.reply({ embeds: [embed] });
	}
}

export default UptimeCommand;
