import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";

/**
 * @deprecated Use CommandInteractionOptions instead.
 */
export type CommandOptions = {
	name: string;
	description: string;
	type: ApplicationCommandType;
	testOnly: boolean;
};

export type CommandInteractionOptions = CommandOptions;

export abstract class Command<C extends CommandInteractionOptions> {
	public name: C["name"];
	public description: C["description"];
	public type: C["type"];
	public testOnly: C["testOnly"];

	constructor(options: CommandInteractionOptions) {
		this.name = options.name;
		this.description = options.description;
		this.type = options.type;
		this.testOnly = options.testOnly;
	}

	public abstract execute(interaction: ChatInputCommandInteraction): Promise<void | unknown> | void;
}
