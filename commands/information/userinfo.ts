import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, MessageFlags, time } from "discord.js";
import { Command } from "../Command.js";
import { UserInfoInteractionCommand } from "../../interactions/userinfo.js";
import i18next from "i18next";

export class UserInfoCommand extends Command<typeof UserInfoInteractionCommand> {
	public constructor() {
		super(UserInfoInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string) {
		const target = interaction.options.getUser("target") || interaction.user;
		const member = (await interaction.guild?.members.fetch(target.id)) as GuildMember;

		const rEmbed = new EmbedBuilder()
			.setAuthor({ iconURL: target.displayAvatarURL(), name: `@${target.username}` })
			.setThumbnail(target.displayAvatarURL({ size: 4096 }))
			.setDescription(`${target}`)
			.addFields([
				{
					name: `${i18next.t("command.common.createdat", { lng: locale })}`,
					value: `${time(Math.floor(target?.createdTimestamp / 1000), "F")} (${time(Math.floor(target?.createdTimestamp / 1000), "R")})`,
				},
				{
					name: `${i18next.t("command.common.joinedat", { lng: locale })}`,
					value: `${time(Math.floor((member?.joinedTimestamp as number) / 1000), "F")} (${time(Math.floor((member?.joinedTimestamp as number) / 1000), "R")})`,
				},
				{
					name: `${i18next.t("command.common.roles", { lng: locale })}`,
					value: `${member?.roles.cache
						.filter((role) => role.id !== member.guild.id)
						.map((role) => `<@&${role.id}>`)
						.join(" ")}`,
				},
				{
					name: `${i18next.t("command.common.permissions", { lng: locale })}`,
					value: `${member?.permissions
						.toArray()
						.map((perm) => `\`${perm}\``)
						.join(" ")}`,
				},
			])
			.setFooter({ text: `${i18next.t("command.common.userid", { lng: locale })}: ${target.id}` });

		await interaction.reply({ embeds: [rEmbed], flags: MessageFlags.Ephemeral });
	}
}

export default UserInfoCommand;
