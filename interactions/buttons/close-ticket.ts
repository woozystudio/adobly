import { ButtonOptions } from "@adobly/framework";
import { PermissionFlagsBits } from "discord.js";

export const CloseTicketInteractionButton: ButtonOptions = {
	customId: "close-ticket",
	userPermissions: [PermissionFlagsBits.UseApplicationCommands],
	testOnly: false,
};
