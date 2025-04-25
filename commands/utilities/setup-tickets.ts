import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	TextChannel,
} from "discord.js";
import { Command } from "../Command.js";
import { SetupTicketsInteractionCommand } from "../../interactions/setup-tickets.js";
import i18next from "i18next";

export class SetupTicketsCommand extends Command<typeof SetupTicketsInteractionCommand> {
	constructor() {
		super(SetupTicketsInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string) {
		const channel = (interaction.options.getChannel("channel") || interaction.channel) as TextChannel;

		const TicketCreateEmbed = new EmbedBuilder()
			.setAuthor({
				name: `${i18next.t("command.utility.setupticket.createembed.author", { lng: locale, guild_name: interaction.guild?.name })}`,
			})
			.setDescription(`${i18next.t("command.utility.setupticket.createembed.description", { lng: locale })}`)
			.setThumbnail(`${interaction.guild?.iconURL()}`)
			.setColor("Blurple");

		const CreateTicketButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("create-ticket")
				.setLabel(`${i18next.t("command.utility.setupticket.createbutton", { lng: locale })}`)
				.setEmoji("📥")
				.setStyle(ButtonStyle.Secondary),
		);

		await interaction.reply({
			content: `${i18next.t("command.utility.setupticket.success", { lng: locale })}`,
			flags: MessageFlags.Ephemeral,
		});
		await channel.send({ embeds: [TicketCreateEmbed], components: [CreateTicketButton] });
	}
}

export default SetupTicketsCommand;
