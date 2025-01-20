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

    // Check if the message contains the target link (fixupx.com)
    if (url.includes("fixupx.com") || url.includes("vxtwitter.com")) {
        console.log("No changes needed");
        return;
    }

    // Check if the message contains a URL
    if (url.includes("https://")) {
        // Check if the URL contains x.com or twitter.com
        if (url.includes("x.com") || url.includes("twitter.com")) {
            const parts = message.content.split(" ");
            
            let urlsPart = parts.filter(part => part.includes("x.com") || part.includes("twitter.com"));
            let textPart = parts.filter(part => !part.includes("x.com") && !part.includes("twitter.com")).join(" "); // Get the rest of the message text
            
            let fixedUrls = [];

            urlsPart.forEach((part) => {
                const fixedUrl = part.replace("x.com", "fixupx.com").replace("twitter.com", "fixupx.com");
                fixedUrls.push(fixedUrl); // Add fixed URL to the list
            });

            // Construct the final message
            let messageToSend = `${textPart ? `> ${textPart}\n\n` : ""}Sent by <@${message.author.id}> |`;

            if (fixedUrls.length === 1) {
                messageToSend += ` [Link](${fixedUrls[0]})`;
            } else {
            
                fixedUrls.forEach((url, index) => {
                    messageToSend += ` [[${index + 1}]](${url})`; 
                });
            }

            // Send the formatted message with links
            message.channel.send(messageToSend);
            
            // Delete the original message after formatting
            message.delete()
                .then(() => console.log("Original user message deleted"))
                .catch((err) => {
                    if (err.code === 10008) {
                        console.log("Message already deleted or not found");
                    } else {
                        console.error("Error deleting message:", err);
                    }
                });
        }
    }

    // Responding to the specific command
    if (message.content === "tjaapa") {
        message.channel.send("I am inspired by tikzyyy's bot, tjaapa 😊");
    }

    if (message.content.toLowerCase().includes("duck")) {
        const rolledNumber = Math.floor(Math.random() * 100) + 1;

        if (rolledNumber === 1) {
            message.channel.send("# DUCK ELSKER FUWAMOCO");
        }
    }
});
