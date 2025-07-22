import { Command } from "@adobly/framework";
import { pingCommand } from "../../interactions/ping.js";
import { ChatInputCommandInteraction, MessageFlags } from "discord.js";

export default class PingCommand extends Command<typeof pingCommand> {
	public constructor() {
		super(pingCommand);
	}

	public async chatInput(interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			content: `Bot latency: ${Date.now() - interaction.createdTimestamp}ms\nAPI latency: ${Math.round(
				interaction.client.ws.ping,
			)}ms`,
			flags: MessageFlags.Ephemeral,
		});
	}
}
