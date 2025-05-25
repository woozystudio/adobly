import { ChatInputCommandInteraction } from "discord.js";
import type { CommandInteractionOptions } from "../types/Command";
import { CubismClient } from "../structures/CubismClient";

export abstract class Command<C extends CommandInteractionOptions> {
	public name: C["name"];
	public description: C["description"];
	public type: C["type"];
	public default_member_permissions: C["userPermissions"];
	public options?: C["options"];
	public testOnly: C["testOnly"];

	constructor(options: CommandInteractionOptions) {
		this.name = options.name;
		this.description = options.description;
		this.type = options.type;
		this.default_member_permissions = options.userPermissions;
		this.options = options.options;
		this.testOnly = options.testOnly;
	}

	public abstract chatInput(
		interaction: ChatInputCommandInteraction,
		locale?: string,
		bot?: CubismClient,
	): Promise<void | unknown> | void;
}
