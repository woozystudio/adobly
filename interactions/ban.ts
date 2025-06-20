import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const BanInteractionCommand: CommandOptions = {
	name: "ban",
	description: "Ban a user from the server.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.BanMembers,
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
