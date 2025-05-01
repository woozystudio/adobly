import { ApplicationCommandOptionData, ApplicationCommandType } from "discord.js";

export type CommandInteractionOptions = {
	name: string;
	description: string;
	type: ApplicationCommandType;
	options?: ApplicationCommandOptionData[];
	testOnly: boolean;
};
