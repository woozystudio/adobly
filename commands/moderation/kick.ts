import { ChatInputCommandInteraction, GuildMember, User } from "discord.js";
import { KickInteractionCommand } from "../../interactions/commands/kick.js";
import ErrorEmbed from "../../embeds/ErrorEmbed.js";
import i18next from "i18next";
import SuccessEmbed from "../../embeds/SuccessEmbed.js";
import { AdoblyClient, Command } from "@adobly/framework";

export class KickCommand extends Command<typeof KickInteractionCommand> {
	public constructor() {
		super(KickInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string, bot: AdoblyClient) {
		const target = interaction.options.getUser("target") as User;
		const reason = interaction.options.getString("reason") as string;
		const interactionMember = interaction.member as GuildMember;
		const findMember = interaction.guild?.members.cache.find((member) => member.user.id === target.id) as GuildMember;

		if (!findMember)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.common.errors.target_not_found", { lng: locale })}`),
			);

		const member = (await interaction.guild?.members.fetch(target.id)) as GuildMember;

		if (!member.bannable)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.common.errors.no_bot_permissions", { lng: locale })}`),
			);

		if (member.id === bot.client.user?.id)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.common.errors.cannot_moderate_bot", { lng: locale })}`),
			);

		if (member.id === interaction.user.id)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.common.errors.cannot_moderate_yourself", { lng: locale })}`),
			);

		if (member.roles.highest.position >= interactionMember.roles.highest.position)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.common.errors.cannot_moderate_higher_role", { lng: locale })}`),
			);

		try {
			await member.kick(reason);
			return interaction.reply(SuccessEmbed.message(`${i18next.t("command.mod.kick.success", { lng: locale })}`));
		} catch (e) {
			console.error(e);
			return interaction.reply(ErrorEmbed.message(`${i18next.t("command.common.errors.generic", { lng: locale })}`));
		}
	}
}

export default KickCommand;
