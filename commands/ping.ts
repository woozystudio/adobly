import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import CubismClient from "../structures/CubismClient.js";
import { Command, CommandInteractionOptions } from "../builders/Command.js";

export class PingCommand extends Command<CommandInteractionOptions> {
	constructor() {
		super({
			name: "ping",
			description: "Bot latency",
			type: ApplicationCommandType.ChatInput,
			testOnly: false,
		});
	}

	override execute(interaction: ChatInputCommandInteraction) {
		interaction.reply({ content: `\`${CubismClient.client.ws.ping}ms\``, flags: MessageFlags.Ephemeral });
	}
}

export default PingCommand;
