import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const UptimeInteractionCommand: CommandOptions = {
	name: "uptime",
	description: "It shows how long the client has been active.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.UseApplicationCommands,
	testOnly: true,
} as const;
