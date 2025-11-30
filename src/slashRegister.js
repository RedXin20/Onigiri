require("dotenv").config({ path: "../.env" });
const { REST, Routes } = require("discord.js");

const commands = [
	{
		name: "alive",
		description: "[⁠♡] Am I alive⁠?"
	}
]

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_KEY);

(async () => {
	try {
		console.log("Registering slash commands");

		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands }
		);

		console.log("Sucessful!");
	} catch (error) {
		console.error("Failed to register commands:", error);
	}
})();
