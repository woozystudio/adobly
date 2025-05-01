import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChannelType,
	ChatInputCommandInteraction,
	EmbedBuilder,
	Events,
	GuildMember,
	MessageFlags,
	PermissionFlagsBits,
	TextChannel,
} from "discord.js";
import CubismClient from "../../../structures/CubismClient";
import { EventListener } from "../../EventListener";
import i18next from "i18next";

export default class InteractionCreateEventListener extends EventListener {
	constructor() {
		super({
			name: Events.InteractionCreate,
		});
	}

	override async execute(interaction: ChatInputCommandInteraction | ButtonInteraction) {
		const locale = "es-ES";

		if (interaction.isChatInputCommand()) {
			const command = CubismClient.commands.get(interaction.commandName);

			if (!command) return;

			return command.chatInput(interaction, locale);
		} else if (interaction.isButton()) {
			if (interaction.customId === "create-ticket") {
				const interactionChannel = interaction.channel as TextChannel;
				const channel = (await interaction.guild?.channels.create({
					name: `ticket-${interaction.user.username}`,
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
				})) as TextChannel;

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

				channel.send({
					content: `${interaction.user}`,
					embeds: [CreatedTicketEmbed],
					components: [TicketManagerButtons],
				});

				return interaction.reply({
					content: `${i18next.t("systems.tickets.success", { lng: locale, channel: `${channel}` })}`,
					flags: MessageFlags.Ephemeral,
				});
			} else if (interaction.customId === "close-ticket") {
				const interactionChannel = interaction.channel as TextChannel;
				const member = (await interaction.guild?.members.fetch(interaction.user)) as GuildMember;
				if (!member?.permissions.has(PermissionFlagsBits.ManageChannels))
					return interaction.reply({
						content: `${i18next.t("common.errors.no_permissions", { lng: locale })}`,
						flags: "Ephemeral",
					});

				const CloseEmbed = new EmbedBuilder()
					.setDescription(`${i18next.t("systems.tickets.embeds.closing", { lng: locale })}`)
					.setColor("Blurple");

				setTimeout(() => {
					interactionChannel.delete();
				}, 5000);

				return interaction.reply({ embeds: [CloseEmbed] });
			} else return;
		} else return;
	}
}
