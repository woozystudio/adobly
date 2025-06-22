import { model, Schema } from "mongoose";

let Ticket = new Schema({
	GuildID: String,
	ChannelID: String,
	MembersID: [String],
	CreatorID: String,
	TicketID: String,
	Closed: Boolean,
});

export default model("ticket", Ticket);
