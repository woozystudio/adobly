import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChannelType,
	EmbedBuilder,
	MessageFlags,
	PermissionFlagsBits,
	TextChannel,
} from "discord.js";
import { Button } from "@adobly/framework";
import { CreateTicketInteractionButton } from "../../interactions/buttons/create-ticket";
import i18next from "i18next";
import TicketSetup from "../../mongo/TicketSetup";
import { Modules } from "../../consts/enums";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import Ticket from "../../mongo/Ticket";

export class CreateTicketButton extends Button<typeof CreateTicketInteractionButton> {
	public constructor() {
		super(CreateTicketInteractionButton);
	}

	public override async execute(interaction: ButtonInteraction, locale: string) {
		const data = await TicketSetup.findOne({ GuildID: interaction.guild?.id });
		const ticketId = Math.floor(Math.random() * 9000) + 10000;

		if (!data)
			return interaction.reply(
				`${i18next.t("command.common.errors.no_enabled_module", { lng: locale, module: Modules.Tickets })}`,
			);

		const interactionChannel = interaction.channel as TextChannel;
		await interaction.guild?.channels
			.create({
				name: `${interaction.user.username}-ticket${ticketId}`,
				parent: interactionChannel.parentId,
				type: ChannelType.GuildText,
				permissionOverwrites: [
					{
						id: `${interaction.guildId}`,
						deny: [
							PermissionFlagsBits.SendMessages,
							PermissionFlagsBits.ViewChannel,
							PermissionFlagsBits.ReadMessageHistory,
						],
					},
					{
						id: interaction.user.id,
						allow: [
							PermissionFlagsBits.SendMessages,
							PermissionFlagsBits.ViewChannel,
							PermissionFlagsBits.ReadMessageHistory,
						],
					},
				],
			})
			.then(async (channel) => {
				const CreatedTicketEmbed = new EmbedBuilder()
					.setTitle(`${i18next.t("systems.tickets.embeds.ticketcreated.title", { lng: locale })}`)
					.setColor(0xa9d0ff)
					.setDescription(`${i18next.t("systems.tickets.embeds.ticketcreated.description", { lng: locale })}`)
					.setFooter({
						iconURL: `${interaction.guild?.iconURL()}`,
						text: `${i18next.t("systems.tickets.embeds.ticketcreated.footer", { lng: locale, guild_name: interaction.guild?.name })}`,
					})
					.setTimestamp();

				const TicketManagerButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setCustomId("close-ticket")
						.setLabel(`${i18next.t("systems.tickets.closebutton", { lng: locale })}`)
						.setEmoji("🔒")
						.setStyle(ButtonStyle.Secondary),
				);

				await Ticket.create({
					GuildID: interaction.guildId,
					ChannelID: channel.id,
					MembersID: [interaction.user.id],
					CreatorID: interaction.user.id,
					TicketID: ticketId,
					Closed: false,
				});

				channel.send({
					content: `${interaction.user}`,
					embeds: [CreatedTicketEmbed],
					components: [TicketManagerButtons],
				});

				await interaction.reply({
					content: `\`✅\` ${i18next.t("systems.tickets.success", { lng: locale, channel: `${channel}` })}`,
					flags: MessageFlags.Ephemeral,
				});
			})
			.catch(async () => {
				await interaction.reply(ErrorEmbed.message(`${i18next.t("command.common.errors.generic", { lng: locale })}`));
			});

		return;
	}
}
