import { ChatInputCommandInteraction, Events } from "discord.js";
import { Event, EventCreatorOptions } from "../builders/Event";
import CubismClient from "../structures/CubismClient";

export default class InteractionCreate extends Event<EventCreatorOptions> {
	constructor() {
		super({
			name: Events.InteractionCreate,
		});
	}

	override execute(interaction: ChatInputCommandInteraction) {
		if (!interaction.isChatInputCommand()) return;

		const command = CubismClient.commands.get(interaction.commandName);

		if (!command) return;

		return command.execute(interaction);
	}
}
