import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ButtonBuilder,
	ButtonStyle,
	ChannelType,
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	TextChannel,
} from "discord.js";
import { Command, CommandInteractionOptions } from "../builders/Command.js";

export class SetupTicketsCommand extends Command<CommandInteractionOptions> {
	constructor() {
		super({
			name: "setup-tickets",
			description: "Set up the ticketing system on your server.",
			type: ApplicationCommandType.ChatInput,
			testOnly: false,
			options: [
				{
					name: "channel",
					description: "Select a channel to send the message to create the tickets.",
					type: ApplicationCommandOptionType.Channel,
					channel_types: [ChannelType.GuildText],
					required: false,
				},
			],
		});
	}

	override async execute(interaction: ChatInputCommandInteraction) {
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
