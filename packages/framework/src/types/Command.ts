import { ApplicationCommandOptionData, ApplicationCommandType } from "discord.js";

export type CommandPayload = {
	name: string;
	description: string;
	type: ApplicationCommandType;
	userPermissions?: bigint | bigint[];
	options?: ApplicationCommandOptionData[];
	testOnly: boolean;
};
