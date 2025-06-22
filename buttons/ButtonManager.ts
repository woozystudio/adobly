import { Button, ButtonOptions } from "@adobly/framework";
import { TicketsConfigurationButton } from "./tickets/tickets-configuration";
import { TicketsSendMessageButton } from "./tickets/tickets-sendmessage";
import { CreateTicketButton } from "./tickets/create-ticket";
import { CloseTicketButton } from "./tickets/close-ticket";

export class ButtonManager {
	buttons: Button<ButtonOptions>[] = [
		new TicketsConfigurationButton(),
		new TicketsSendMessageButton(),
		new CreateTicketButton(),
		new CloseTicketButton(),
	];
}

export default new ButtonManager();
