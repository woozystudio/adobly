import { Events } from "discord.js";
import type { EventListenerOptions } from "../types/Event";

export abstract class EventListener {
	public name: Events;
	public once?: boolean;

	constructor(options: EventListenerOptions) {
		this.name = options.name;
		this.once = options.once;
	}

	public abstract execute(...args: unknown[]): Promise<void | unknown> | void;
}
