import { Modal } from "@adobly/framework";
import { ModalSubmitInteraction } from "discord.js";
import { TicketsConfigurationInteractionModal } from "../../interactions/modals/tickets-configuration";
import TicketSetup from "../../mongo/TicketSetup";
import SuccessEmbed from "../../embeds/SuccessEmbed";
import i18next from "i18next";

export class TicketsConfigurationModal extends Modal<typeof TicketsConfigurationInteractionModal> {
	constructor() {
		super(TicketsConfigurationInteractionModal);
	}

	override async execute(interaction: ModalSubmitInteraction, locale: string) {
		const description = interaction.fields.getTextInputValue("tickets-config-embeddescription");

		await TicketSetup.findOneAndUpdate({ GuildID: interaction.guildId }, { Description: description });

		await interaction.reply(SuccessEmbed.message(`${i18next.t("systems.tickets.modal.success", { lng: locale })}`));
	}
}
