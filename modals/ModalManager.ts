import { Modal, ModalOptions } from "@adobly/framework";
import { TicketsConfigurationModal } from "./tickets/tickets-configuration";

export class ModalManager {
	buttons: Modal<ModalOptions>[] = [new TicketsConfigurationModal()];
}

export default new ModalManager();
