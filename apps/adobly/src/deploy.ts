import { registerApplicationCommands } from "@adobly/framework";
import { client } from "./index.js";

await registerApplicationCommands(client, client.testGuildID);
process.exit(0);
