import { ButtonOptions } from "@adobly/framework";
import { PermissionFlagsBits } from "discord.js";

export const TicketsSendMessageInteractionButton: ButtonOptions = {
	customId: "tickets-sendmessage",
	userPermissions: [PermissionFlagsBits.UseApplicationCommands],
	testOnly: false,
};
