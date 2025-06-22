import { ButtonOptions } from "@adobly/framework";
import { PermissionFlagsBits } from "discord.js";

export const TicketsConfigurationInteractionButton: ButtonOptions = {
	customId: "tickets-configuration",
	userPermissions: [PermissionFlagsBits.UseApplicationCommands],
	testOnly: false,
};
