import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	MessageFlags,
	Role,
	TextChannel,
} from "discord.js";
import { AutoRolesAddInteractionSubCommand } from "../../../interactions/commands/sub/autoroles-add";
import AutoRolesSetup from "../../../mongo/AutoRolesSetup";
import ErrorEmbed from "../../../embeds/ErrorEmbed";
import i18next from "i18next";
import { Modules } from "../../../consts/enums";
import { AdoblyClient, SubCommand } from "@adobly/framework";

export class AutoRolesAddSubCommand extends SubCommand<typeof AutoRolesAddInteractionSubCommand> {
	constructor() {
		super(AutoRolesAddInteractionSubCommand);
	}

	override async chatInput(interaction: ChatInputCommandInteraction, locale: string, bot: AdoblyClient) {
		const role = interaction.options.getRole("role") as Role;
		const label = interaction.options.getString("label") || `@${role.name}`;
		const emoji = interaction.options.getString("emoji") || "";
		const color = interaction.options.getString("color") || ButtonStyle.Secondary;
		const disabled = interaction.options.getBoolean("disabled") || false;

		const data = await AutoRolesSetup.findOne({ GuildID: interaction.guildId });
		if (!data)
			return interaction.reply({
				content: `${ErrorEmbed.message(
					i18next.t("command.common.errors.no_enabled_module", { lng: locale, module: Modules.AutoRoles }),
				)}`,
				flags: MessageFlags.Ephemeral,
			});

		data.AutoRoles.push({
			Label: label,
			RoleName: role.name,
			Emoji: emoji,
			RoleID: role.id,
			Style: color,
			Disabled: disabled,
		});

		await data.save();

		const ch = (await bot.client.channels.fetch(data.ChannelID as string)) as TextChannel;
		const message = await ch.messages.fetch(data.MessageID as string).catch(() => null);

		if (!message)
			return interaction.reply({
				content: `${ErrorEmbed.message(i18next.t("command.common.errors.no_message", { lng: locale }))}`,
				flags: MessageFlags.Ephemeral,
			});

		const buttons: ButtonBuilder[] = [];
		const rows: ActionRowBuilder<ButtonBuilder>[] = [];

		// Rebuild the buttons from the updated AutoRoles array
		for (const b of data.AutoRoles) {
			const button = new ButtonBuilder()
				.setCustomId(`autorole-${interaction.guildId}-${b.RoleID}`)
				.setLabel(b.Label as string)
				.setStyle(b.Style as unknown as ButtonStyle)
				.setDisabled(b.Disabled as boolean);

			buttons.push(button);
		}

		for (let i = 0; i < buttons.length; i += 5) {
			rows.push(new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons.slice(i, i + 5)));
		}

		// Update the message with the new button
		message.edit({
			components: rows,
		});

		return await interaction.reply({
			content: `\`✅\` ${i18next.t("command.utility.autoroles.sucessfully_added", { lng: locale, role: `${role}` })}`,
			flags: MessageFlags.Ephemeral,
		});
	}
}

export default new AutoRolesAddSubCommand();
