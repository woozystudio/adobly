import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";

export type CommandOptions = {
	name: string;
	description: string;
	type: ApplicationCommandType;
};

export abstract class Command<C extends CommandOptions> {
	public name: C["name"];
	public description: C["description"];
	public type: C["type"];

	constructor(options: CommandOptions) {
		this.name = options.name;
		this.description = options.description;
		this.type = options.type;
	}

	public abstract execute(interaction: ChatInputCommandInteraction): Promise<any> | any;
}
