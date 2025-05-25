import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const SetupMuteInteractionCommand: CommandInteractionOptions = {
	name: "setup-mute",
	description: "Set up the muting system on your server.",
	userPermissions: PermissionFlagsBits.ManageGuild,
	type: ApplicationCommandType.ChatInput,
	testOnly: false,
	options: [
		{
			name: "role",
			description: "Select the role to be added to the muted user.",
			type: ApplicationCommandOptionType.Role,
			required: true,
		},
	],
} as const;
