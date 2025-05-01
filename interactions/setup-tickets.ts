import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const SetupTicketsInteractionCommand: CommandInteractionOptions = {
	name: "setup-tickets",
	description: "Set up the ticketing system on your server.",
	type: ApplicationCommandType.ChatInput,
	testOnly: false,
	options: [
		{
			name: "channel",
			description: "Select a channel to send the message to create the tickets.",
			type: ApplicationCommandOptionType.Channel,
			channel_types: [ChannelType.GuildText],
			required: false,
		},
	],
} as const;
