import EmbedWrapper from "./EmbedWrapper";

export default class ErrorEmbed extends EmbedWrapper {
	/**
	 *
	 * @param description The description of the error.
	 */
	constructor(description: string) {
		super();
		this.setDescription(`\`❌\` ${description}`);
		this.setColor(0xfb2f61);
	}

	static message(description: string) {
		return new this(description).toMessage(true);
	}
}
