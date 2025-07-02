import { SubCommand, SubCommandOptions } from "@adobly/framework";
import SetupMuteSubCommand from "./utilities/sub/setup-mute.js";
import SetupTicketsSubCommand from "./utilities/sub/setup-tickets.js";
import SetupAutoRolesSubCommand from "./autoroles/setup-autoroles.js";
import { AutoRolesAddSubCommand } from "./autoroles/sub/add.js";
import { AutoRolesRemoveSubCommand } from "./autoroles/sub/remove.js";

export class SubCommandManager {
	subCommands: SubCommand<SubCommandOptions>[] = [
		/* Setup */
		new SetupMuteSubCommand(),
		new SetupTicketsSubCommand(),
		new SetupAutoRolesSubCommand(),

		/* AutoRoles */
		new AutoRolesAddSubCommand(),
		new AutoRolesRemoveSubCommand(),
	];
}

export default new SubCommandManager();
