import { REST } from "@discordjs/rest";
import { AdoblyClient } from "../AdoblyClient.js";
import { getLocalCommands } from "./getLocalCommands.js";
import { Routes } from "discord.js";
import { translateToJSON } from "./translateToJSON.js";

export async function registerApplicationCommands(client: AdoblyClient, guildId: string) {
	try {
		const localCommands = await getLocalCommands(client);

		for (const localCommand of localCommands) {
			client.commands.set(localCommand.name, localCommand);

			if (localCommand.deleted) {
				await client.commands.delete(localCommand.name);
				console.log(`Application command ${localCommand.name} has been deleted.`);
			}
		}

		const rest = new REST({ version: "10" }).setToken(client.token);

		try {
			await rest.put(Routes.applicationCommands(client.id), {
				body: translateToJSON(client.commands.filter((command) => !command.deleted && !command.testMode)),
			});

			await rest.put(Routes.applicationGuildCommands(client.id, guildId), {
				body: translateToJSON(client.commands.filter((command) => !command.deleted && command.testMode)),
			});

			console.log("Application commands registered successfully.");
		} catch (error) {
			console.error(error);
		}
	} catch (error) {
		console.error("Failed to register application commands:", error);
	}
}
