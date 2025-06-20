import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const GuildInfoInteractionCommand: CommandOptions = {
	name: "guildinfo",
	description: "See server information.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.UseApplicationCommands,
	testOnly: false,
} as const;
