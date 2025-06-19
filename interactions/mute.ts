import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const MuteInteractionCommand: CommandOptions = {
	name: "mute",
	description: "Mutes a server user.",
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
			description: "Enter the reason for this sanction.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
} as const;
