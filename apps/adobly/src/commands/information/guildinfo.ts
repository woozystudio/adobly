import { ChatInputCommandInteraction, codeBlock, EmbedBuilder, Guild, MessageFlags, time } from "discord.js";
import { Command } from "@adobly/framework";
import { GuildInfoInteractionCommand } from "../../interactions/commands/guildinfo.js";
import i18next from "i18next";

export class GuildInfoCommand extends Command<typeof GuildInfoInteractionCommand> {
	public constructor() {
		super(GuildInfoInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string) {
		const guild = interaction.guild as Guild;

		const rEmbed = new EmbedBuilder()
			.setAuthor({ name: guild.name, iconURL: guild.iconURL() ?? undefined })
			.setThumbnail(guild.iconURL())
			.setDescription(`**ID:** ${guild.id}\n**${i18next.t("command.common.name", { lng: locale })}:** ${guild.name}`)
			.setFooter({ text: `${i18next.t("command.common.guildid", { lng: locale })}: ${guild.id}` });

		await interaction.reply({
			embeds: [
				{
					...rEmbed.toJSON(),
					fields: [
						{
							name: `${i18next.t("command.info.guildinfo.owner", { lng: locale })}`,
							value: `${codeBlock(`${(await guild.fetchOwner()).user.username}`)}`,
							inline: true,
						},
						{
							name: `${i18next.t("command.common.members", { lng: locale })}`,
							value: `${codeBlock(`${guild.memberCount}`)}`,
							inline: true,
						},
						{
							name: "",
							value: "",
						},
						{
							name: `${i18next.t("command.common.roles", { lng: locale })}`,
							value: `${codeBlock(`${guild.roles.cache.size}/250`)}`,
							inline: true,
						},
						{
							name: `${i18next.t("command.common.channels", { lng: locale })}`,
							value: `${codeBlock(`${guild.channels.cache.size}/500`)}`,
							inline: true,
						},
						{
							name: `${i18next.t("command.common.emojis", { lng: locale })}`,
							value: `${codeBlock(`${guild.emojis.cache.size}/250`)}`,
							inline: true,
						},
						{
							name: `${i18next.t("command.common.createdat", { lng: locale })}`,
							value: `${time(Math.floor(guild?.createdTimestamp / 1000), "F")} (${time(Math.floor(guild?.createdTimestamp / 1000), "R")})`,
						},
					],
				},
			],
			flags: MessageFlags.Ephemeral,
		});
	}
}

export default GuildInfoCommand;
