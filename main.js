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
    if (url.includes("fixupx.com") || url.includes("vxtwitter.com") || url.includes("ssstwitter.com") || url.includes("fxtwitter.com") || url.includes("roblox.com")) {
        console.log("No changes needed");
        return;
    }

    // Check if the message contains a URL
    if (url.includes("https://")) {

        // Check if the URL contains x.com or twitter.com
        if (url.includes("x.com") || url.includes("twitter.com")) {
            const parts = message.content.split(" ");

            // Filter out the twitter and x URLs if they are not tied to a post
            let urlsPart = parts.filter(part => 
                (part.includes("x.com") || part.includes("twitter.com")) &&
                !["https://twitter.com/", "https://www.twitter.com/", "https://twitter.com", "https://www.twitter.com", 
                    "https://x.com/", "https://www.x.com/", "https://x.com", "https://www.x.com"].includes(part)
              );
              
            // Console log in terminal the no post url
            if (urlsPart.length === 0) {
                console.log("No changes needed (no post)");
                return;
            }

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

    if (url.includes("instagram.com") || url.includes("www.instagram.com")) {
        const parts2 = message.content.split(" ");

        // Filter out Instagram URLs (Reels)
        let urlsPart2 = parts2.filter(part => 
            (part.includes("instagram.com") || part.includes("www.instagram.com")) &&
            !part.includes("ddinstagram.com")
        );

        if (urlsPart2.length === 0) {
            console.log("No Instagram Reels URL found.");
            return;
        }

        let textPart2 = parts2.filter(part => !part.includes("instagram.com")).join(" "); // Get the rest of the message text
        
        let fixedUrls2 = [];

        urlsPart2.forEach((part) => {
            const fixedUrl2 = part.replace("instagram.com", "ddinstagram.com").replace("www.instagram.com", "ddinstagram.com");
            fixedUrls2.push(fixedUrl2); // Add fixed URL to the list
        });

        let messageToSend2 = `${textPart2 ? `> ${textPart2}\n\n` : ""}Sent by <@${message.author.id}> |`;

        if (fixedUrls2.length === 1) {
            messageToSend2 += ` [Link](${fixedUrls2[0]})`;
        } else {
            fixedUrls2.forEach((url, index) => {
                messageToSend2 += ` [[${index + 1}]](${url})`; 
            });
        }

        // Send the formatted message with links
        message.channel.send(messageToSend2);
        
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

    // Responding to the specific command
    if (message.content === "tjaapa") {
        message.channel.send("I am inspired by tikzyyy's bot, tjaapa 😊");
    }

    if (message.content.toLowerCase().includes("duck")) {
        const rolledNumber = Math.floor(Math.random() * 1000) + 1;

        if (rolledNumber === 1) {
            message.channel.send("# DUCK ER SÅ BAUBAU~ ♡");
        }
    }
});
