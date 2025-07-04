import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const LangInteractionCommand: CommandOptions = {
	name: "lang",
	description: "Change the bot language to suit your needs.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.ManageGuild,
	testOnly: false,
	options: [
		{
			name: "language",
			description: "Select the language of your choice.",
			type: ApplicationCommandOptionType.String,
			choices: [
				{ name: "English (United States)", value: "en-US" },
				{ name: "Español", value: "es-ES" },
				{ name: "Français", value: "fr-FR" },
			],
			required: true,
		},
	],
} as const;
