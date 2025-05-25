import { Collection } from "discord.js";
import { Command } from "../commands/Command";
import type { CommandInteractionOptions } from "../types/Command";

export default function convertCommandsInJSON(
	commands: Collection<string, Command<CommandInteractionOptions>>,
): object[] {
	const data: object[] = [];

	commands.forEach((command: Command<CommandInteractionOptions>) => {
		data.push({
			name: command.name,
			description: command.description,
			type: command.type,
			default_member_permissions: command.default_member_permissions.toString(),
			testOnly: command.testOnly,
			options: command.options,
		});
	});

	return data;
}
