import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const AvatarInteractionCommand: CommandOptions = {
	name: "avatar",
	description: "View a user avatar.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.UseApplicationCommands,
	testOnly: false,
	options: [
		{
			name: "target",
			description: "The user to get the avatar of.",
			type: ApplicationCommandOptionType.User,
			required: false,
		},
	],
} as const;
