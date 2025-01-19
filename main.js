require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

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
    if (url.includes("fixupx.com")) {
        console.log("No changes needed");
        return;
    }

    // Check if the message contains a URL
    if (url.includes("https://")) {
        // Check if the URL contains x.com or twitter.com
        if (url.includes("x.com") || url.includes("twitter.com")) {
            const parts = message.content.split(" ");
            let textPart = parts.slice(1).join(" "); // Get the text after the URLs

            // Array to hold fixed URLs
            let fixedUrls = [];

            // Loop through the parts and process all URLs
            parts.forEach((part) => {
                if (part.includes("x.com") || part.includes("twitter.com")) {
                    const fixedUrl = part.replace("x.com", "fixupx.com").replace("twitter.com", "fixupx.com");
                    fixedUrls.push(fixedUrl);
                }
            });

            // Now we need to format the message
            if (fixedUrls.length === 1) {
                // If there's only one URL, format it as [Link]
                const messageToSend = `${textPart ? `> ${textPart}` : ""}\n\n Sent by <@${message.author.id}> | [Link](${fixedUrls[0]}) `;
                message.channel.send(messageToSend);
            
            } else if (fixedUrls.length > 1) {
                // If there are multiple links, format each one as [1], [2], [3], etc.
                const formattedLinks = fixedUrls.map((url, index) => `[[${index + 1}]](${url})`).join(' ');
            
                // Manually remove the original URLs from the textPart
                const cleanedTextPart = parts.filter(part => !part.includes("x.com") && !part.includes("twitter.com")).join(' ').trim();
            
                // Send only the formatted links and any cleaned text, ignoring the original raw URLs
                const messageToSend = `${cleanedTextPart ? `> ${cleanedTextPart}` : ""}\n\n Sent by <@${message.author.id}> | ${formattedLinks}`;
                message.channel.send(messageToSend);
            }

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
        const rolledNumber = Math.floor(Math.random() * 1000000) + 1;

        if (rolledNumber === 1) {
            message.channel.send("# DUCK ELSKER FUWAMOCO");
        }
    } 
});
