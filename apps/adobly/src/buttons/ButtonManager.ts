import { Button, ButtonOptions } from "@adobly/framework";
import { TicketsConfigurationButton } from "./tickets/tickets-configuration.js";
import { TicketsSendMessageButton } from "./tickets/tickets-sendmessage.js";
import { CreateTicketButton } from "./tickets/create-ticket.js";
import { CloseTicketButton } from "./tickets/close-ticket.js";
import { ClaimTicketButton } from "./tickets/claim-ticket.js";

export class ButtonManager {
	buttons: Button<ButtonOptions>[] = [
		/* Tickets */
		new TicketsConfigurationButton(),
		new TicketsSendMessageButton(),
		new CreateTicketButton(),
		new CloseTicketButton(),
		new ClaimTicketButton(),
	];
}

export default new ButtonManager();
