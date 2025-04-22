import { Events } from "discord.js";

export type EventCreatorOptions = {
	name: Events;
	once?: boolean;
};

export abstract class Event<C extends EventCreatorOptions> {
	public name: C["name"];
	public once: C["once"];

	constructor(options: EventCreatorOptions) {
		this.name = options.name;
		this.once = options.once;
	}

	public abstract execute(...args: unknown[]): Promise<void | unknown> | void;
}
