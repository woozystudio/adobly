import { ChatInputCommandInteraction } from "discord.js";
import type { SubCommandInteractionOptions } from "../types/SubCommand";
import { CubismClient } from "../structures/CubismClient";

export abstract class SubCommand<C extends SubCommandInteractionOptions> {
	public name: C["name"];
	public commandName: C["commandName"]; // Nombre del comando principal, donde se encuentra el subcomando.
	public groupName?: C["groupName"]; // Si el subcomando pertenece a un grupo, se DEBE especificar aquí.

	constructor(options: SubCommandInteractionOptions) {
		this.name = options.name;
		this.commandName = options.commandName;
		this.groupName = options.groupName;
	}

	public abstract chatInput(
		interaction: ChatInputCommandInteraction,
		locale?: string,
		bot?: CubismClient,
	): Promise<void | unknown> | void;
}
