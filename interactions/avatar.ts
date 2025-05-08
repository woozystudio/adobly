import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const AvatarInteractionCommand: CommandInteractionOptions = {
	name: "avatar",
	description: "View a user avatar.",
	type: ApplicationCommandType.ChatInput,
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
