import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const TimestampInteractionCommand: CommandInteractionOptions = {
	name: "timestamp",
	description: "Converts a common date and time to a unix timestamp date.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.UseApplicationCommands,
	testOnly: false,
	options: [
		{
			name: "date",
			description: 'Enter the date with the format "MM/DD/YYYY"',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "time",
			description: 'Enter the time with the format "HH:MM:SS"',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: "format",
			description: "Choose the format for the timestamp.",
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{ name: "Tuesday, April 22, 2025 10:00 AM", value: "F" },
				{ name: "April 22, 2025 10:00 AM", value: "f" },
				{ name: "April 22, 2025", value: "D" },
				{ name: "04/22/2025", value: "d" },
				{ name: "- months ago", value: "R" },
			],
		},
	],
} as const;
