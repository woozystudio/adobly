import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	CategoryChannel,
	ChatInputCommandInteraction,
	EmbedBuilder,
	TextChannel,
} from "discord.js";
import { SubCommand } from "@adobly/framework";
import { SetupTicketsInteractionSubCommand } from "../../../interactions/commands/sub/setup-tickets";
import TicketSetup from "../../../mongo/TicketSetup";
import i18next from "i18next";

export class SetupTicketsSubCommand extends SubCommand<typeof SetupTicketsInteractionSubCommand> {
	constructor() {
		super(SetupTicketsInteractionSubCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string) {
		const channel = interaction.options.getChannel("channel") as TextChannel;
		const category = interaction.options.getChannel("category") as CategoryChannel;

		let data = await TicketSetup.findOne({ GuildID: interaction.guildId }, { new: true, upsert: true });

		if (!data) {
			data = await TicketSetup.create({
				GuildID: interaction.guildId,
				ChannelID: channel.id,
				ParentID: category.id,
			});
		} else {
			await TicketSetup.findOneAndUpdate({
				GuildID: interaction.guildId,
				ChannelID: channel.id,
				ParentID: category.id,
			});
		}

		const ConfigurationEmbed = new EmbedBuilder()
			.setAuthor({
				name: `${i18next.t("command.utility.setupticket.createembed.author", { lng: locale, guild_name: interaction.guild?.name })}`,
			})
			.setColor(0x00d26a)
			.setDescription(`${i18next.t("command.utility.setupticket.configembed.description", { lng: locale })}`)
			.setTimestamp();

		const ConfigurationButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("tickets-configuration")
				.setLabel(`${i18next.t("command.utility.setupticket.buttons.config", { lng: locale })}`)
				.setEmoji("⚙️")
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId("tickets-sendmessage")
				.setLabel(`${i18next.t("command.utility.setupticket.buttons.sendmessage", { lng: locale })}`)
				.setEmoji("✅")
				.setStyle(ButtonStyle.Success),
		);

		await interaction.reply({ embeds: [ConfigurationEmbed], components: [ConfigurationButtons] });
	}
}

export default SetupTicketsSubCommand;
