import { ChatInputCommandInteraction, GuildMember, RoleResolvable, User } from "discord.js";
import { Command } from "../Command.js";
import { UnmuteInteractionCommand } from "../../interactions/unmute.js";
import { CubismClient } from "../../structures/CubismClient.js";
import i18next from "i18next";
import ErrorEmbed from "../../embeds/ErrorEmbed.js";
import SuccessEmbed from "../../embeds/SuccessEmbed.js";
import Mute from "../../mongo/Mute.js";
import { Modules } from "../../consts/enums.js";

export class UnmuteCommand extends Command<typeof UnmuteInteractionCommand> {
	public constructor() {
		super(UnmuteInteractionCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string, bot: CubismClient) {
		const target = interaction.options.getUser("target") as User;
		const reason = interaction.options.getString("reason") as string;
		const interactionMember = interaction.member as GuildMember;
		const findMember = interaction.guild?.members.cache.find((member) => member.user.id === target.id) as GuildMember;

		if (!findMember)
			return interaction.reply(
				ErrorEmbed.message(`${i18next.t("command.common.errors.target_not_found", { lng: locale })}`),
			);

		const member = (await interaction.guild?.members.fetch(target.id)) as GuildMember;

		const data = await Mute.findOne({ GuildID: interaction.guildId });
		if (!data)
			return interaction.reply(
				ErrorEmbed.message(
					`${i18next.t("command.common.errors.no_enabled_module", { lng: locale, module: Modules.Mute })}`,
				),
			);

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
			await member.roles.remove(data.RoleID as RoleResolvable, reason);
			return interaction.reply(SuccessEmbed.message(`${i18next.t("command.mod.unmute.success", { lng: locale })}`));
		} catch (e) {
			console.error(e);
			return interaction.reply(ErrorEmbed.message(`${i18next.t("command.common.errors.generic", { lng: locale })}`));
		}
	}
}

export default UnmuteCommand;
