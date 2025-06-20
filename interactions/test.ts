import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import { CommandOptions } from "@adobly/framework";

export const TestInteractionCommand: CommandOptions = {
	name: "test",
	description: "Command to be used to test different features of the app.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.UseApplicationCommands,
	testOnly: true,
} as const;
