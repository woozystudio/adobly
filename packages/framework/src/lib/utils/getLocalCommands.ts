import fs from "fs";
import { pathToFileURL } from "url";
import { CommandPayload } from "../../types/Command.js";
import { AdoblyClient } from "../AdoblyClient.js";
import { Command } from "../structures/Command.js";
import { fileCondition } from "./fileCondition.js";

export async function getLocalCommands(client: AdoblyClient) {
	const localCommands: Command<CommandPayload>[] = [];
	const commandsPath = client.commandsPath as string;

	const folders = fs.readdirSync(commandsPath);
	for (const folder of folders) {
		const files = fs.readdirSync(`${commandsPath}/${folder}`).filter(fileCondition);

		for (const fileName of files) {
			const modulePath = pathToFileURL(`${commandsPath}/${folder}/${fileName}`).href;
			const commandModule = await import(modulePath);
			const CommandClass = commandModule.default;
			const command = new CommandClass();
			localCommands.push(command);
		}
	}

	return localCommands;
}
