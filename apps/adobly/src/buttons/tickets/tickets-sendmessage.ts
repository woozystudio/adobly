import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	EmbedBuilder,
	MessageFlags,
	TextChannel,
} from "discord.js";
import { Button } from "@adobly/framework";
import { TicketsSendMessageInteractionButton } from "../../interactions/buttons/tickets-sendmessage";
import TicketSetup from "../../mongo/TicketSetup";
import i18next from "i18next";
import ErrorEmbed from "../../embeds/ErrorEmbed";

export class TicketsSendMessageButton extends Button<typeof TicketsSendMessageInteractionButton> {
	public constructor() {
		super(TicketsSendMessageInteractionButton);
	}

	public override async execute(interaction: ButtonInteraction, locale: string) {
		const data = await TicketSetup.findOne({ GuildID: interaction.guildId });
		if (!data) return;

		const channel = (await interaction.client.channels.fetch(data.ChannelID as string)) as TextChannel;

		const CreateTicketEmbed = new EmbedBuilder()
			.setAuthor({
				name: `${i18next.t("command.utility.setupticket.createembed.author", { lng: locale, guild_name: interaction.guild?.name })}`,
			})
			.setThumbnail(`${interaction.guild?.iconURL()}`)
			.setColor("Blurple");

		const CreateTicketButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("create-ticket")
				.setLabel(`${i18next.t("command.utility.setupticket.createbutton", { lng: locale })}`)
				.setEmoji("📥")
				.setStyle(ButtonStyle.Secondary),
		);

		if (!data.Description || data.Description === "-") {
			CreateTicketEmbed.setDescription(
				`${i18next.t("command.utility.setupticket.createembed.description", { lng: locale })}`,
			);

			await channel.send({ embeds: [CreateTicketEmbed], components: [CreateTicketButton] });
			return await interaction.reply({
				content: `\`✅\` ${i18next.t("systems.tickets.buttons.sendmessage.success", { lng: locale })}`,
				flags: MessageFlags.Ephemeral,
			});
		} else if (data.Description) {
			CreateTicketEmbed.setDescription(data.Description);

			await channel.send({ embeds: [CreateTicketEmbed], components: [CreateTicketButton] });
			return await interaction.reply({
				content: `\`✅\` ${i18next.t("systems.tickets.buttons.sendmessage.success", { lng: locale })}`,
				flags: MessageFlags.Ephemeral,
			});
		} else {
			return await interaction.reply(
				ErrorEmbed.message(
					`${i18next.t("systems.tickets.buttons.sendmessage.errors.cannot_send_message", { lng: locale })}`,
				),
			);
		}
	}
}
