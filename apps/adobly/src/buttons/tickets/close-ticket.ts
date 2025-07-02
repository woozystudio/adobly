import { ButtonInteraction, EmbedBuilder, TextChannel } from "discord.js";
import { Button } from "@adobly/framework";
import { CloseTicketInteractionButton } from "../../interactions/buttons/close-ticket";
import i18next from "i18next";
import Ticket from "../../mongo/Ticket";
import ErrorEmbed from "../../embeds/ErrorEmbed";

export class CloseTicketButton extends Button<typeof CloseTicketInteractionButton> {
	public constructor() {
		super(CloseTicketInteractionButton);
	}

	public override async execute(interaction: ButtonInteraction, locale: string) {
		const channel = interaction.channel as TextChannel;

		const data = await Ticket.findOne({ GuildID: interaction.guildId, ChannelID: channel.id });

		if (interaction.user.id === data?.CreatorID)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.common.errors.no_permissions", { lng: locale })}`),
			);

		const CloseEmbed = new EmbedBuilder()
			.setDescription(`\`⚙️\` ${i18next.t("systems.tickets.embeds.closing", { lng: locale })}`)
			.setColor(0xfb2f61)
			.setTimestamp();

		await Ticket.findOneAndDelete({ GuildID: interaction.guildId }, { ChannelID: channel.id });

		setTimeout(async () => {
			await channel.delete();
		}, 5000);

		await interaction.reply({ embeds: [CloseEmbed] });
		return;
	}
}
