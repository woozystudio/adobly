import EmbedWrapper from "./EmbedWrapper.js";

export default class WarningEmbed extends EmbedWrapper {
	/**
	 *
	 * @param description The description of the warning message.
	 */
	constructor(description: string) {
		super();
		this.setDescription(`\`⚠️\` ${description}`);
		this.setColor(0xffcc4d);
	}

	static message(description: string) {
		return new this(description).toMessage(true);
	}
}
