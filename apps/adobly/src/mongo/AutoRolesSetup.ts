import { model, Schema } from "mongoose";

let AutoRolesSetup = new Schema({
	GuildID: String,
	ChannelID: String,
	MessageID: String,
	AutoRoles: [
		{
			Label: String,
			RoleName: String,
			Emoji: String,
			RoleID: String,
			Style: String,
			Disabled: Boolean,
		},
	],
});

export default model("autoRolesSetup", AutoRolesSetup);
