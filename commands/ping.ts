import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import CubismClient from "../structures/CubismClient.js";
import { Command, CommandOptions } from "../structures/builders/CommandBuilder.js";

export class PingCommand extends Command<CommandOptions> {
	constructor() {
		super({
			name: "ping",
			description: "Bot latency",
			type: ApplicationCommandType.ChatInput,
		});
	}

	override execute(interaction: ChatInputCommandInteraction) {
		interaction.reply(`\`${CubismClient.client.ws.ping}ms\``);
	}
}

export default PingCommand;
