import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const KickInteractionCommand: CommandOptions = {
	name: "kick",
	description: "Kicks a user from the server.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.KickMembers,
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
