import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../Command.js";
import { LangInteractionCommand } from "../../interactions/lang.js";
import Language from "../../mongo/Language.js";
import SuccessEmbed from "../../embeds/SuccessEmbed.js";
import i18next from "i18next";

export class LangCommand extends Command<typeof LangInteractionCommand> {
	public constructor() {
		super(LangInteractionCommand);
	}

	public override async chatInput(interaction: ChatInputCommandInteraction, locale: string) {
		const lang = interaction.options.getString("language", true);
		let data = await Language.findOne({ GuildID: interaction.guildId });

		if (!data) {
			data = await Language.create({ GuildID: interaction.guildId, Language: lang });
			await interaction.reply(
				SuccessEmbed.message(`${i18next.t("command.utility.lang.success", { lng: locale, lang: data?.Language })}`),
			);
		} else {
			await Language.findOneAndUpdate({ GuildID: interaction.guildId, Language: lang });
			await interaction.reply(
				SuccessEmbed.message(`${i18next.t("command.utility.lang.updated", { lng: locale, lang: data?.Language })}`),
			);
		}
	}
}

export default LangCommand;
