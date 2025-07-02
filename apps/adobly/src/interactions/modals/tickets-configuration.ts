import { ModalOptions } from "@adobly/framework";
import { PermissionFlagsBits } from "discord.js";

export const TicketsConfigurationInteractionModal: ModalOptions = {
	customId: "tickets-modal-config",
	userPermissions: [PermissionFlagsBits.UseApplicationCommands],
	testOnly: false,
};
