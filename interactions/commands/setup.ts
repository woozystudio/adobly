import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const SetupInteractionCommand: CommandOptions = {
	name: "setup",
	description: "Configure the bot systems on your server",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.ManageGuild,
	testOnly: false,
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
					required: true,
				},
				{
					name: "category",
					description: "Select the category where the tickets will be created.",
					type: ApplicationCommandOptionType.Channel,
					channel_types: [ChannelType.GuildCategory],
					required: true,
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
		{
			name: "autoroles",
			description: "Set up the autoroles system on your server.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "channel",
					description: "Select a channel to send the message to create the autoroles.",
					type: ApplicationCommandOptionType.Channel,
					channel_types: [ChannelType.GuildText],
					required: false,
				},
			],
		},
	],
} as const;
