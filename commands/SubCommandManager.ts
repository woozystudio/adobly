import { SubCommand, SubCommandOptions } from "@adobly/framework";
import SetupMuteSubCommand from "./utilities/sub/setup-mute";
import SetupTicketsSubCommand from "./utilities/sub/setup-tickets";
import SetupAutoRolesSubCommand from "./autoroles/setup-autoroles";
import { AutoRolesAddSubCommand } from "./autoroles/sub/add";
import { AutoRolesRemoveSubCommand } from "./autoroles/sub/remove";

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
