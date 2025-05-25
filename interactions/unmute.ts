import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const UnmuteInteractionCommand: CommandInteractionOptions = {
	name: "unmute",
	description: "Unmutes a server user.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.MuteMembers | PermissionFlagsBits.ModerateMembers,
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
			description: "Enter the reason for this unmute.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
} as const;
