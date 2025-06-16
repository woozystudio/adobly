import { ChatInputCommandInteraction } from "discord.js";
import { SubCommand } from "../SubCommand.js";
import { SetupAutoRolesInteractionSubCommand } from "../../interactions/sub/setup-autoroles.js";
import i18next from "i18next";

export class SetupAutoRolesSubCommand extends SubCommand<typeof SetupAutoRolesInteractionSubCommand> {
	constructor() {
		super(SetupAutoRolesInteractionSubCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string) {
		/* const channel = (interaction.options.getChannel("channel") as TextChannel) || interaction.channel;

		let data = await AutoRolesSetup.findOne({ GuildID: interaction.guildId }, { new: true, upsert: true });

		const sentMessage = await channel.send({ embeds: [new EmbedBuilder().setTitle("AutoRoles")] });

		if (!data) {
			data = await AutoRolesSetup.create({
				GuildID: interaction.guildId,
				ChannelID: channel.id,
				MessageID: sentMessage.id,
			});
		} else {
			await AutoRolesSetup.findOneAndUpdate({
				GuildID: interaction.guildId,
				ChannelID: channel.id,
				MessageID: sentMessage.id,
			});
		}

		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setColor(0xa9d0ff)
					.setDescription(i18next.t("command.utility.autoroles.setup.success", { lng: locale })),
			],
		}); */

		await interaction.reply({ content: `${i18next.t("common.testMode", { lng: locale })}` });
	}
}

export default SetupAutoRolesSubCommand;
