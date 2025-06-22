import { Button, ButtonOptions } from "@adobly/framework";
import { TicketsConfigurationButton } from "./tickets/tickets-configuration";
import { TicketsSendMessageButton } from "./tickets/tickets-sendmessage";

export class ButtonManager {
	buttons: Button<ButtonOptions>[] = [new TicketsConfigurationButton(), new TicketsSendMessageButton()];
}

export default new ButtonManager();
