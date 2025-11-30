require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const handleMessage = require("./messageHandler");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.login(process.env.DISCORD_KEY)
    .then(() => console.log("Logged in!"))
    .catch(err => console.error("Failed to log in :(", err));

    client.on("messageCreate", handleMessage);

    client.on("interactionCreate", async interaction => {
        if (interaction.isChatInputCommand()) {
            
            // TryCatch for Alive
            if (interaction.commandName === "alive") {
                try {
                    await interaction.reply("# Bau Bau ⁠♡")
                } catch (err) {
                    console.error("Error handling /amialive:", err);
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({ content: "Uuh… something went wrong ;w;", ephemeral: true });
                }
            }
    }}
})