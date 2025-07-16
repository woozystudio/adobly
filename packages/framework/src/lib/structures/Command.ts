import { ApplicationCommandOptionData, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { AdoblyClient } from "../AdoblyClient.js";
import { CommandPayload } from "../../types/Command.js";

export abstract class Command<C extends CommandPayload> {
	public readonly name: string;
	public readonly description: string;
	public readonly type: ApplicationCommandType;
	public readonly userPermissions?: bigint | bigint[];
	public readonly options?: ApplicationCommandOptionData[];
	public readonly testMode: boolean;
	public readonly deleted?: boolean;

	protected constructor(options: C) {
		this.name = options.name;
		this.description = options.description;
		this.type = options.type;
		this.userPermissions = options.userPermissions;
		this.options = options.options;
		this.testMode = options.testMode;
		this.deleted = options.deleted;
	}

	public abstract chatInput(
		interaction: ChatInputCommandInteraction,
		locale?: string,
		bot?: AdoblyClient,
	): Promise<void | unknown> | void;
}
