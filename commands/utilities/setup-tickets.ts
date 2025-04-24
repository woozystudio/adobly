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

export class SetupTicketsCommand extends Command<typeof SetupTicketsInteractionCommand> {
	constructor() {
		super(SetupTicketsInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction) {
		const channel = (interaction.options.getChannel("channel") || interaction.channel) as TextChannel;

		const TicketCreateEmbed = new EmbedBuilder()
			.setAuthor({ name: `Ticketing system for ${interaction.guild?.name}` })
			.setDescription(
				`
            \`❓\` **What is a ticket?**
            > A ticket is a communication method for the server's support team to help you with any questions or problems you may have.
            `,
			)
			.setThumbnail(`${interaction.guild?.iconURL()}`)
			.setColor("Blurple");

		const CreateTicketButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("create-ticket")
				.setLabel("Create Ticket")
				.setEmoji("📥")
				.setStyle(ButtonStyle.Secondary),
		);

		await interaction.reply({
			content: `\`✅\` The ticket creation message has been sent.`,
			flags: MessageFlags.Ephemeral,
		});
		await channel.send({ embeds: [TicketCreateEmbed], components: [CreateTicketButton] });
	}
}

export default SetupTicketsCommand;
