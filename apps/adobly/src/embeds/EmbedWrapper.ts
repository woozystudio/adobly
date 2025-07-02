import { EmbedBuilder, MessageFlags } from "discord.js";

export default class EmbedWrapper extends EmbedBuilder {
	toMessage(ephemeral: boolean = false) {
		return {
			embeds: [this],
			flags: ephemeral ? MessageFlags.Ephemeral : 0,
		};
	}
}
