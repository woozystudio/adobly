import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const UptimeInteractionCommand: CommandInteractionOptions = {
	name: "uptime",
	description: "It shows how long the client has been active.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.UseApplicationCommands,
	testOnly: true,
} as const;
