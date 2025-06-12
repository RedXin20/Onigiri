const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("raid")
		.setDescription("Shows the current WoW raid info"),

	execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle("Mogu'Shan Vaults")
			.setURL("https://wowhead.com/zone=6125") // optional: link to Mogu'shan Vaults info
			.setAuthor({
				name: "Guild Raid Assistant",
				iconURL: "https://i.imgur.com/AfFp7pu.png",
				url: "https://wowhead.com/zone=6125",
			})
			.setDescription("Current scheduled raid details")
			.setThumbnail("https://i.imgur.com/AfFp7pu.png")
			.addFields(
				{ name: "Date", value: "Friday, 18:00", inline: true },
				{ name: "Location", value: "Mogu'shan Vaults", inline: true },
				{ name: "Roles", value: "Tanks, Healers, DPS" }
			)
			.setImage("https://i.imgur.com/AfFp7pu.png")
			.setTimestamp()
			.setFooter({
				text: "Guild Bot",
				iconURL: "https://i.imgur.com/AfFp7pu.png",
			});

		return interaction.reply({ embeds: [embed] });
	},
};
