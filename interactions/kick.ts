import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const KickInteractionCommand: CommandInteractionOptions = {
	name: "kick",
	description: "Kicks a user from the server.",
	type: ApplicationCommandType.ChatInput,
	testOnly: false,
	options: [
		{
			name: "target",
			description: "Select a user form the server.",
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: "reason",
			description: "Enter the reason for this sanction.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
} as const;
