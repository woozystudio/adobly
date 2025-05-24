import { model, Schema } from "mongoose";

let Mute = new Schema({
	GuildID: String,
	RoleID: String,
});

export default model("mute", Mute);
