import { CommandPayload } from "@adobly/framework";
import { ApplicationCommandType } from "discord.js";

export const pingCommand: CommandPayload = {
	name: "ping",
	description: "Replies with Pong!",
	type: ApplicationCommandType.ChatInput,
	testMode: false,
};
