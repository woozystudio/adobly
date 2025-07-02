import { model, Schema } from "mongoose";

let Ticket = new Schema({
	GuildID: String,
	ChannelID: String,
	MembersID: [String],
	CreatorID: String,
	TicketID: String,
	Closed: Boolean,
	Claimed: Boolean,
	ClaimedBy: String,
});

export default model("ticket", Ticket);
