import { AdoblyClient, commandManager, subCommandManager } from "@adobly/framework";
import { ActivityType, GatewayIntentBits, PresenceUpdateStatus } from "discord.js";
import dotenv from "dotenv";
import CommandManager from "./commands/CommandManager";
import SubCommandManager from "./commands/SubCommandManager";
import DiscordEventManager from "./events/discord/DiscordEventManager";
dotenv.config();

export const client = new AdoblyClient({
	token: `${process.env.TOKEN}`,
	id: `${process.env.CLIENT_ID}`,
	testGuildId: `${process.env.GUILD_ID}`,
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	presence: {
		activities: [{ name: "woozystudio.com", type: ActivityType.Custom }],
		status: PresenceUpdateStatus.Idle,
	},
});

client.start();

commandManager.addCommands(CommandManager.commands);
subCommandManager.addSubCommands(SubCommandManager.subCommands);
new DiscordEventManager().subscribe();
