import { ChatInputCommandInteraction } from "discord.js";
import { UnbanInteractionCommand } from "../../interactions/unban.js";
import ErrorEmbed from "../../embeds/ErrorEmbed.js";
import i18next from "i18next";
import SuccessEmbed from "../../embeds/SuccessEmbed.js";
import { Command } from "@adobly/framework";

export class UnbanCommand extends Command<typeof UnbanInteractionCommand> {
	public constructor() {
		super(UnbanInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string) {
		const id = interaction.options.getString("id") as string;
		const reason = interaction.options.getString("reason") as string;
		const findUser = await interaction.client.users.fetch(id).catch(() => null);
		const findBan = await interaction.guild?.bans.fetch(id).catch(() => null);

		if (!findUser)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.common.errors.user_doesnt_exist", { lng: locale })}`),
			);

		if (!findBan)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.mod.unban.errors.not_found", { lng: locale })}`),
			);

		try {
			await interaction.guild?.bans.remove(id, reason);
			return interaction.reply(SuccessEmbed.message(`${i18next.t("command.mod.unban.success", { lng: locale })}`));
		} catch (e) {
			console.error(e);
			return interaction.reply(ErrorEmbed.message(`${i18next.t("command.common.errors.generic", { lng: locale })}`));
		}
	}
}

export default UnbanCommand;
