import { ApplicationCommandOptionType, ApplicationCommandType, ButtonStyle, PermissionFlagsBits } from "discord.js";
import { CommandInteractionOptions } from "../types/Command";

export const AutoRolesInteractionCommand: CommandInteractionOptions = {
	name: "autoroles",
	description: "Configure the autorol system your way.",
	type: ApplicationCommandType.ChatInput,
	userPermissions: PermissionFlagsBits.ManageGuild,
	testOnly: false,
	options: [
		{
			name: "add",
			description: "Add a role to the autorole system.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "role",
					description: "Select a role from the server.",
					type: ApplicationCommandOptionType.Role,
					required: true,
				},
				{
					name: "label",
					description: "The label for the role in the autorole button.",
					type: ApplicationCommandOptionType.String,
					required: false,
				},
				{
					name: "emoji",
					description: "The emoji for the role in the autorole button.",
					type: ApplicationCommandOptionType.String,
					required: false,
				},
				{
					name: "color",
					description: "The color of the button for the role in the autorole button.",
					type: ApplicationCommandOptionType.String,
					required: false,
					choices: [
						{ name: "Blurple", value: `${ButtonStyle.Primary}` },
						{ name: "Grey", value: `${ButtonStyle.Secondary}` },
						{ name: "Green", value: `${ButtonStyle.Success}` },
						{ name: "Red", value: `${ButtonStyle.Danger}` },
					],
				},
				{
					name: "disabled",
					description: "Whether the button should be disabled or not.",
					type: ApplicationCommandOptionType.Boolean,
					required: false,
				},
			],
		},
		{
			name: "remove",
			description: "Remove a role from the autorole system.",
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: "role",
					description: "Select a role from the server.",
					type: ApplicationCommandOptionType.Role,
					required: true,
				},
			],
		},
	],
} as const;
