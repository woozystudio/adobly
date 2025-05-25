import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, PermissionFlagsBits } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const SetupInteractionCommand: CommandInteractionOptions = {
	name: "setup",
	description: "Configure the bot systems on your server",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.ManageGuild,
	testOnly: true,
	options: [
		{
			name: "tickets",
			description: "Set up the ticketing system on your server.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "channel",
					description: "Select a channel to send the message to create the tickets.",
					type: ApplicationCommandOptionType.Channel,
					channel_types: [ChannelType.GuildText],
					required: false,
				},
			],
		},
		{
			name: "mute",
			description: "Set up the muting system on your server.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "role",
					description: "Select the role to be added to the muted user.",
					type: ApplicationCommandOptionType.Role,
					required: true,
				},
			],
		},
	],
} as const;
