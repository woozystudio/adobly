import { ChatInputCommandInteraction, Role } from "discord.js";
import { Command } from "../Command.js";
import { SetupMuteInteractionCommand } from "../../interactions/setup-mute.js";
import i18next from "i18next";
import Mute from "../../mongo/Mute.js";
import SuccessEmbed from "../../embeds/SuccessEmbed.js";

export class SetupMuteCommand extends Command<typeof SetupMuteInteractionCommand> {
	constructor() {
		super(SetupMuteInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string) {
		const role = interaction.options.getRole("role") as Role;
		let data = await Mute.findOne({ GuildID: interaction.guildId });

		if (!data) {
			data = await Mute.create({ GuildID: interaction.guildId, RoleID: role.id });
			await interaction.reply(
				SuccessEmbed.message(`${i18next.t("command.utility.setupmute.success", { lng: locale, role: `${role}` })}`),
			);
		} else {
			await Mute.findOneAndUpdate({ GuildID: interaction.guildId, RoleID: role.id });
			await interaction.reply(
				SuccessEmbed.message(`${i18next.t("command.utility.setupmute.updated", { lng: locale, role: `${role}` })}`),
			);
		}
	}
}

export default SetupMuteCommand;
