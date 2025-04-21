import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import CubismClient from "../../structures/CubismClient.js";
import { Command, CommandInteractionOptions } from "../Command.js";

export class PingCommand extends Command<CommandInteractionOptions> {
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
