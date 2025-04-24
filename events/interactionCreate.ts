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
import { Event, EventCreatorOptions } from "../builders/Event";
import CubismClient from "../structures/CubismClient";

export default class InteractionCreate extends Event<EventCreatorOptions> {
	constructor() {
		super({
			name: Events.InteractionCreate,
		});
	}

	override async execute(interaction: ChatInputCommandInteraction | ButtonInteraction) {
		if (interaction.isChatInputCommand()) {
			const command = CubismClient.commands.get(interaction.commandName);

			if (!command) return;

			return command.execute(interaction);
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
					.setTitle("Welcome! We hope you are well!")
					.setColor(0xa9d0ff)
					.setDescription(
						"A member of the staff will contact you shortly, please be patient. If possible, please leave us your problem or doubt for a faster and more efficient attention.",
					)
					.setFooter({
						iconURL: `${interaction.guild?.iconURL()}`,
						text: `${interaction.guild?.name} Administration`,
					})
					.setTimestamp();

				const TicketManagerButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setCustomId("close-ticket")
						.setLabel("Close Ticket")
						.setEmoji("🔒")
						.setStyle(ButtonStyle.Secondary),
				);

				channel.send({
					content: `${interaction.user}`,
					embeds: [CreatedTicketEmbed],
					components: [TicketManagerButtons],
				});

				return interaction.reply({
					content: `\`✅\` The ticket has been created correctly: ${channel}`,
					flags: MessageFlags.Ephemeral,
				});
			} else if (interaction.customId === "close-ticket") {
				const interactionChannel = interaction.channel as TextChannel;
				const member = (await interaction.guild?.members.fetch(interaction.user)) as GuildMember;
				if (!member?.permissions.has(PermissionFlagsBits.ManageChannels))
					return interaction.reply({
						content: `\`❌\` You do not have sufficient permissions to perform this action.`,
						flags: "Ephemeral",
					});

				const CloseEmbed = new EmbedBuilder().setDescription("The ticket will be closed soon...").setColor(0xfb2f61);

				setTimeout(() => {
					interactionChannel.delete();
				}, 5000);

				return interaction.reply({ embeds: [CloseEmbed] });
			} else return;
		} else return;
	}
}
