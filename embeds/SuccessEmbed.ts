import EmbedWrapper from "./EmbedWrapper";

export default class SuccessEmbed extends EmbedWrapper {
	/**
	 *
	 * @param description The description of the success message.
	 */
	constructor(description: string) {
		super();
		this.setDescription(`\`✅\` ${description}`);
		this.setColor(0x00d26a);
	}

	static message(description: string) {
		return new this(description).toMessage(true);
	}
}
