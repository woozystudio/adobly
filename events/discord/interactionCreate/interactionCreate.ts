import { ButtonInteraction, ChatInputCommandInteraction, Events } from "discord.js";
import Language from "../../../mongo/Language";
import { EventListener, logger } from "@adobly/framework";
import { client } from "../../..";

export default class InteractionCreateEventListener extends EventListener {
	constructor() {
		super({
			name: Events.InteractionCreate,
		});
	}

	override async execute(interaction: ChatInputCommandInteraction | ButtonInteraction) {
		let locale: string;

		const data = await Language.findOne({ GuildID: interaction.guildId });

		if (data && data.Language) {
			locale = data.Language;
		} else {
			locale = process.env.DEFAULT_LOCALE || "es-ES";
		}

		if (interaction.isChatInputCommand()) {
			const command = client.commands.get(interaction.commandName)!;

			if (!command) return client.commands.delete(interaction.commandName);

			try {
				const subCommandGroup = interaction.options.getSubcommandGroup(false);
				const subCommand = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`;

				return (
					client.subCommands.get(subCommand)?.chatInput(interaction, locale, client) ||
					command.chatInput(interaction, locale, client)
				);
			} catch (error) {
				return logger.error(`Command ${interaction.commandName} not found.`, error);
			}
		}

		if (interaction.isButton()) {
			const button = client.buttons.get(interaction.customId)!;

			if (!button) return client.buttons.delete(interaction.customId);

			await button.execute(interaction, locale, client);
		}

		return;
	}
}
