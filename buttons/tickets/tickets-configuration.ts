import {
	ActionRowBuilder,
	ButtonInteraction,
	ModalActionRowComponentBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import { Button } from "@adobly/framework";
import { TicketsConfigurationInteractionButton } from "../../interactions/buttons/tickets-configuration";
import i18next from "i18next";

export class TicketsConfigurationButton extends Button<typeof TicketsConfigurationInteractionButton> {
	public constructor() {
		super(TicketsConfigurationInteractionButton);
	}

	public override async execute(interaction: ButtonInteraction, locale: string) {
		const ConfigModal = new ModalBuilder()
			.setCustomId("tickets-modal-config")
			.setTitle(`${i18next.t("systems.tickets.buttons.config.modal.title", { lng: locale })}`);

		const EmbedDescription = new TextInputBuilder()
			.setCustomId("tickets-config-embeddescription")
			.setLabel(`${i18next.t("systems.tickets.buttons.config.modal.label", { lng: locale })}`)
			.setPlaceholder(`${i18next.t("systems.tickets.buttons.config.modal.placeholder", { lng: locale })}`)
			.setStyle(TextInputStyle.Paragraph);

		const embedDescriptionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(EmbedDescription);

		ConfigModal.addComponents(embedDescriptionRow);

		await interaction.showModal(ConfigModal);
	}
}
