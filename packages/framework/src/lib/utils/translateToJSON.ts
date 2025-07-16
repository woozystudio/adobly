import { Collection } from "discord.js";
import { CommandPayload } from "../../types/Command.js";
import { Command } from "../structures/Command.js";

export function translateToJSON(commands: Collection<string, Command<CommandPayload>>): object[] {
	const data: object[] = [];

	commands.forEach((command: Command<CommandPayload>) => {
		data.push({
			name: command.name,
			description: command.description,
			type: command.type,
			default_member_permissions: command.userPermissions?.toString(),
			testMode: command.testMode,
			options: command.options,
		});
	});

	return data;
}
