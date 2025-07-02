import { AutoRolesCommand } from "./autoroles/autoroles.js";
import { Command, CommandOptions } from "@adobly/framework";
import PingCommand from "./utilities/ping.js";
import TestCommand from "./utilities/test.js";
import TimestampCommand from "./utilities/timestamp.js";
import UserInfoCommand from "./information/userinfo.js";
import GuildInfoCommand from "./information/guildinfo.js";
import AvatarCommand from "./information/avatar.js";
import LangCommand from "./utilities/lang.js";
import BanCommand from "./moderation/ban.js";
import KickCommand from "./moderation/kick.js";
import UnbanCommand from "./moderation/unban.js";
import MuteCommand from "./moderation/mute.js";
import UnmuteCommand from "./moderation/unmute.js";
import SetupCommand from "./utilities/setup.js";
import UptimeCommand from "./utilities/uptime.js";

export class CommandManager {
	commands: Command<CommandOptions>[] = [
		/* Informaton */
		new PingCommand(),
		new UserInfoCommand(),
		new GuildInfoCommand(),
		new AvatarCommand(),

		/* Management */
		new LangCommand(),
		new UptimeCommand(),
		new SetupCommand(),

		/* Moderation */
		new BanCommand(),
		new KickCommand(),
		new UnbanCommand(),
		new MuteCommand(),
		new UnmuteCommand(),

		/* Systems */
		new AutoRolesCommand(),

		/* Dev Tools */
		new TimestampCommand(),

		/* Owner Tools */
		new TestCommand(),
	];
}

export default new CommandManager();
