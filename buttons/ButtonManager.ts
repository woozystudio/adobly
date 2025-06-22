import { Button, ButtonOptions } from "@adobly/framework";
import { TicketsConfigurationButton } from "./tickets/tickets-configuration";
import { TicketsSendMessageButton } from "./tickets/tickets-sendmessage";
import { CreateTicketButton } from "./tickets/create-ticket";
import { CloseTicketButton } from "./tickets/close-ticket";
import { ClaimTicketButton } from "./tickets/claim-ticket";

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
