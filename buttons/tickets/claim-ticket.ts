import { ButtonInteraction, EmbedBuilder, TextChannel } from "discord.js";
import { Button } from "@adobly/framework";
import { ClaimTicketInteractionButton } from "../../interactions/buttons/claim-ticket";
import i18next from "i18next";
import Ticket from "../../mongo/Ticket";
import ErrorEmbed from "../../embeds/ErrorEmbed";

export class ClaimTicketButton extends Button<typeof ClaimTicketInteractionButton> {
	public constructor() {
		super(ClaimTicketInteractionButton);
	}

	public override async execute(interaction: ButtonInteraction, locale: string) {
		const channel = interaction.channel as TextChannel;

		const data = await Ticket.findOne({ GuildID: interaction.guildId, ChannelID: channel.id });

		if (interaction.user.id === data?.CreatorID)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.common.errors.no_permissions", { lng: locale })}`),
			);

		const ClaimEmbed = new EmbedBuilder()
			.setDescription(
				`\`📌\` > ${i18next.t("systems.tickets.claim", { lng: locale, moderator: `${interaction.user}` })}`,
			)
			.setColor(0x00d26a);

		await Ticket.findOneAndUpdate({ GuildID: interaction.guildId }, { ClaimedBy: interaction.user.id, Claimed: true });
		data?.MembersID.push(interaction.user.id);

		await interaction.reply({ embeds: [ClaimEmbed] });
		return;
	}
}
