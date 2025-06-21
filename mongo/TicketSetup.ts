import { model, Schema } from "mongoose";

let TicketSetup = new Schema({
	GuildID: String,
	ChannelID: String,
	ParentID: String,
	Description: String,
});

export default model("ticketSetup", TicketSetup);
