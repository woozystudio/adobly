import { Events } from "discord.js";

export type EventListenerOptions = {
	name: Events;
	once?: boolean;
};
