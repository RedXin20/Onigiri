require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const handleMessage = require("./messageHandler");
const raidCommand = require("./WoW/raidEmbed");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.login(process.env.DISCORD_KEY)
    .then(() => console.log("Logged in ✅"));

    client.on("messageCreate", handleMessage);

    client.on("interactionCreate", async interaction => {
        if (!interaction.isChatInputCommand()) return;
    
        if (interaction.commandName === "raid") {
            await raidCommand.execute(interaction);
        }
    });
