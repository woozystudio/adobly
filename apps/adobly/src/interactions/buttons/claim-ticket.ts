import { ButtonOptions } from "@adobly/framework";
import { PermissionFlagsBits } from "discord.js";

export const ClaimTicketInteractionButton: ButtonOptions = {
	customId: "claim-ticket",
	userPermissions: [PermissionFlagsBits.UseApplicationCommands],
	testOnly: false,
};
