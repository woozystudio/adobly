import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { PingInteractionCommand } from "../../interactions/commands/ping.js";
import { AdoblyClient, Command } from "@adobly/framework";

export class PingCommand extends Command<typeof PingInteractionCommand> {
	public constructor() {
		super(PingInteractionCommand);
	}

	public override chatInput(interaction: ChatInputCommandInteraction, _locale: string, bot: AdoblyClient) {
		interaction.reply({ content: `\`${bot.client.ws.ping}ms\``, flags: MessageFlags.Ephemeral });
	}
}

export default PingCommand;
