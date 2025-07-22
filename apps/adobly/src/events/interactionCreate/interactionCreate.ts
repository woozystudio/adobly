import { AdoblyClient, Event, EventPayload } from "@adobly/framework";
import { ChatInputCommandInteraction, ClientEvents, Events } from "discord.js";

export default class InteractionCreate extends Event<EventPayload, keyof ClientEvents> {
	public constructor() {
		super({
			name: Events.InteractionCreate,
			once: false,
		});
	}

	public async execute(client: AdoblyClient, interaction: ChatInputCommandInteraction) {
		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.chatInput(interaction, interaction.locale, client);
		} catch (error) {
			console.error(`Error executing command ${interaction.commandName}:`, error);
			await interaction.reply({
				content: "There was an error while executing this command.",
				ephemeral: true,
			});
		}
	}
}
