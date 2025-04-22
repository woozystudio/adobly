import { Collection } from "discord.js";
import { Command, CommandInteractionOptions } from "../builders/Command";

export default function convertCommandsInJSON(
	commands: Collection<string, Command<CommandInteractionOptions>>,
): object[] {
	const data: object[] = [];

	commands.forEach((command: Command<CommandInteractionOptions>) => {
		data.push({
			name: command.name,
			description: command.description,
			type: command.type,
			testOnly: command.testOnly,
			options: command.options,
		});
	});

	return data;
}
