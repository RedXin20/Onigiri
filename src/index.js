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
    .then(() => console.log("Logged in ✅"));

    client.on("messageCreate", handleMessage);

    client.on("interactionCreate", async interaction => {
        if (interaction.isChatInputCommand()) {
            if (interaction.commandName === "raid") {
                await raidCommand.execute(interaction);
            }
        }
    
        if (interaction.isButton()) {
            if (interaction.customId === "join_raid" || interaction.customId === "leave_raid") {
                await raidCommand.handleButton(interaction); 
            }
        }
    });
    
    
