import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const GuildInfoInteractionCommand: CommandInteractionOptions = {
	name: "guildinfo",
	description: "See server information.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.UseApplicationCommands,
	testOnly: false,
} as const;
