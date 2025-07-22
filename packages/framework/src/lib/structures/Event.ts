import { ClientEvents } from "discord.js";
import { EventPayload } from "../../types/Event.js";
import { AdoblyClient } from "../AdoblyClient.js";

export abstract class Event<C extends EventPayload, K extends keyof ClientEvents> {
	public readonly name: string;
	public readonly description?: string;
	public readonly once: boolean;

	protected constructor(options: C) {
		this.name = options.name;
		this.description = options.description;
		this.once = options.once;
	}

	public abstract execute(client: AdoblyClient, ...args: ClientEvents[K]): Promise<void | unknown> | void;
}
