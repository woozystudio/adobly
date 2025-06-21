import { Button, ButtonOptions } from "@adobly/framework";
import { ButtonInteraction } from "discord.js";

export class TestButton extends Button<ButtonOptions> {
	constructor() {
		super({
			customId: "test",
			userPermissions: [],
			testOnly: true,
		});
	}

	override execute(interaction: ButtonInteraction) {
		interaction.reply("Test!");
	}
}
