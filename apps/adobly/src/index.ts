import {
	AdoblyClient,
	buttonManager,
	commandManager,
	logger,
	modalManager,
	subCommandManager,
} from "@adobly/framework";
import { ActivityType, GatewayIntentBits, PresenceUpdateStatus } from "discord.js";
import dotenv from "dotenv";
import CommandManager from "./commands/CommandManager";
import SubCommandManager from "./commands/SubCommandManager";
import ButtonManager from "./buttons/ButtonManager";
import DiscordEventManager from "./events/discord/DiscordEventManager";
import { connect } from "mongoose";
import ModalManager from "./modals/ModalManager";
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

client.start().then(() => {
	connect(`${process.env.MONGO_URI}`, { appName: "adobly-v1" }).then(() => {
		logger.info("MongoDB database connected.");
	});
});

commandManager.addCommands(CommandManager.commands);
subCommandManager.addSubCommands(SubCommandManager.subCommands);
buttonManager.addButtons(ButtonManager.buttons);
modalManager.addModals(ModalManager.buttons);
new DiscordEventManager().subscribe();
