import { Button, ButtonOptions } from "@adobly/framework";
import { TestButton } from "./test/test";

export class ButtonManager {
	buttons: Button<ButtonOptions>[] = [new TestButton()];
}

export default new ButtonManager();
