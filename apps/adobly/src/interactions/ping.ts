import { CommandPayload } from "@adobly/framework";
import { ApplicationCommandType } from "discord.js";

export const pingCommand: CommandPayload = {
	name: "pong",
	description: "Replies with Pong!",
	type: ApplicationCommandType.ChatInput,
	testMode: true,
	deleted: true,
};
