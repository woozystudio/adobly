import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const UserInfoInteractionCommand: CommandInteractionOptions = {
	name: "userinfo",
	description: "See information about a server user.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.UseApplicationCommands,
	testOnly: false,
	options: [
		{
			name: "target",
			description: "The user to get information about.",
			type: ApplicationCommandOptionType.User,
			required: false,
		},
	],
} as const;
