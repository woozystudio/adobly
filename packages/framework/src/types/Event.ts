import { Events } from "discord.js";

export type EventPayload = {
	name: Events;
	description?: string;
	once: boolean;
};
