import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags } from "discord.js";
import { Command } from "@adobly/framework";
import { AvatarInteractionCommand } from "../../interactions/commands/avatar.js";
import i18next from "i18next";

export class AvatarCommand extends Command<typeof AvatarInteractionCommand> {
	public constructor() {
		super(AvatarInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string) {
		const target = interaction.options.getUser("target") || interaction.user;
		const avatarURL = target.displayAvatarURL({ size: 4096 });

		const rEmbed = new EmbedBuilder()
			.setTitle(`${i18next.t("command.info.avatar.title", { lng: locale, username: `@${target.username}` })}`)
			.setURL(avatarURL)
			.setDescription(avatarURL)
			.setImage(avatarURL);

		await interaction.reply({ embeds: [rEmbed], flags: MessageFlags.Ephemeral });
	}
}

export default AvatarCommand;
