import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const UnbanInteractionCommand: CommandOptions = {
	name: "unban",
	description: "Unban a user from the server.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.BanMembers | PermissionFlagsBits.ModerateMembers,
	testOnly: false,
	options: [
		{
			name: "id",
			description: "Enter the id of the user.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "reason",
			description: "Enter the reason for this action.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
} as const;
