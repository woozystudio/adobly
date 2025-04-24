import { ApplicationCommandType } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const TestInteractionCommand: CommandInteractionOptions = {
	name: "test",
	description: "Command to be used to test different features of the app.",
	type: ApplicationCommandType.ChatInput,
	testOnly: true,
} as const;
