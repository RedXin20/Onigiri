require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, 
    ]
});

// Starting the bot
client.login(process.env.DISCORD_KEY)
    .then(() => {
        console.log("Logged in ✅");
    });

// Message listener
client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const url = message.content.toLowerCase();

    if (url.includes("fixupx.com")) {
        console.log("No changes needed");
        return;
    }

    if (message.content.toLowerCase().startsWith("https://")) {
        if (url.includes("x.com") || url.includes("twitter.com")) {

            const parts = message.content.split(" ");
            const urlPart = parts[0];
            const textPart = parts.slice(1).join(" "); 

            // Format the URL
            const fixedUrl = urlPart.replace("x.com", "fixupx.com").replace("twitter.com", "fixupx.com");

            // Send the formatted message
            const messageToSend = `Sent by <@${message.author.id}> | [Link](${fixedUrl}) ${textPart ? ` ${textPart}` : ""}`

            message.channel.send(messageToSend);

            // Delete the original message after formatting
            message.delete()
                .then(() => console.log("Original user message deleted"))
                .catch((err) => {
                    if (err.code === 10008) {
                        console.log("Message already deleted or not found");
                    } else {
                        console.error("not 10008 erorr:", err);
                }
            });
        }
    }

    if (message.content === "tjaapa")
        message.channel.send("I am inspired by tikzyy's bot, tjaapa 😊");
});