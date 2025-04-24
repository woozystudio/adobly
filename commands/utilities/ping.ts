import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import CubismClient from "../../structures/CubismClient.js";
import { Command } from "../Command.js";
import { PingInteractionCommand } from "../../interactions/ping.js";

export class PingCommand extends Command<typeof PingInteractionCommand> {
	public constructor() {
		super(PingInteractionCommand);
	}

	public override chatInput(interaction: ChatInputCommandInteraction) {
		interaction.reply({ content: `\`${CubismClient.client.ws.ping}ms\``, flags: MessageFlags.Ephemeral });
	}
}

export default PingCommand;
