import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";

/**
 * @deprecated Use CommandInteractionOptions instead.
 */
export type CommandOptions = {
	name: string;
	description: string;
	type: ApplicationCommandType;
};

export type CommandInteractionOptions = CommandOptions;

export abstract class Command<C extends CommandInteractionOptions> {
	public name: C["name"];
	public description: C["description"];
	public type: C["type"];

	constructor(options: CommandInteractionOptions) {
		this.name = options.name;
		this.description = options.description;
		this.type = options.type;
	}

	public abstract execute(interaction: ChatInputCommandInteraction): Promise<any> | any;
}
