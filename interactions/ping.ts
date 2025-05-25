import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const PingInteractionCommand: CommandInteractionOptions = {
	name: "ping",
	description: "Receive application latency.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.UseApplicationCommands,
	testOnly: false,
} as const;
