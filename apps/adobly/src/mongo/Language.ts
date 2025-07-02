import { model, Schema } from "mongoose";

let Language = new Schema({
	GuildID: String,
	Language: String,
});

export default model("language", Language);
