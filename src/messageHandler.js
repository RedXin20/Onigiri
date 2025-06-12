module.exports = handleMessage;

function handleMessage(message) {
    if (message.author.bot) return;

    const url = message.content.toLowerCase();

    if (
        url.includes("fixupx.com") || url.includes("vxtwitter.com") ||
        url.includes("ssstwitter.com") || url.includes("fxtwitter.com") ||
        url.includes("roblox.com")
    ) {
        console.log("No changes needed");
        return;
    }

    if (url.includes("https://") && (url.includes("x.com") || url.includes("twitter.com"))) {
        const parts = message.content.split(" ");
        const urlsPart = parts.filter(part =>
            (part.includes("x.com") || part.includes("twitter.com")) &&
            ![
                "https://twitter.com/", "https://www.twitter.com/", "https://twitter.com", "https://www.twitter.com",
                "https://x.com/", "https://www.x.com/", "https://x.com", "https://www.x.com"
            ].includes(part)
        );

        if (urlsPart.length === 0) {
            console.log("No changes needed (invalid)");
            return;
        }

        const textPart = parts.filter(part => !part.includes("x.com") && !part.includes("twitter.com")).join(" ");
        const fixedUrls = urlsPart.map(part =>
            part.replace("x.com", "fixupx.com").replace("twitter.com", "fixupx.com")
        );

        let messageToSend = `${textPart ? `> ${textPart}\n\n` : ""}Sent by <@${message.author.id}> |`;

        fixedUrls.forEach((url, index) => {
            messageToSend += fixedUrls.length === 1 ? ` [Link](${url})` : ` [[${index + 1}]](${url})`;
        });

        message.channel.send(messageToSend);
        message.delete()
        .then(() => console.log(`Changed the link from "${message.author.username}" (twitter)`))
        .catch(err => {
            if (err.code === 10008) {
                console.log("Message already deleted or not found");
            } else {
                console.error("Error deleting message:", err);
            }
        });
    }

    // Instragram 
    if (url.includes("instagram.com") || url.includes("www.instagram.com")) {
        const parts2 = message.content.split(" ");
        const urlsPart2 = parts2.filter(part =>
            (part.includes("instagram.com") || part.includes("www.instagram.com")) &&
            !part.includes("ddinstagram.com")
        );

        if (urlsPart2.length === 0) {
            console.log("No reels found");
            return;
        }

        const textPart2 = parts2.filter(part => !part.includes("instagram.com")).join(" ");
        const fixedUrls2 = urlsPart2.map(part =>
            part.replace("instagram.com", "ddinstagram.com").replace("www.instagram.com", "ddinstagram.com")
        );

        let messageToSend2 = `${textPart2 ? `> ${textPart2}\n\n` : ""}Sent by <@${message.author.id}> |`;

        fixedUrls2.forEach((url, index) => {
            messageToSend2 += fixedUrls2.length === 1 ? ` [Link](${url})` : ` [[${index + 1}]](${url})`;
        });

        message.channel.send(messageToSend2);
        message.delete()
        .then(() => console.log(`Changed the link from "${message.author.username}" (instagram)`))
        .catch(err => {
            if (err.code === 10008) {
                console.log("Message already deleted or not found");
            } else {
                console.error("Error deleting message:", err);
            }
        });
    }

    // Chat related commands 
    if (message.content === "tjaapa") {
        message.channel.send("I am inspired by tikzyyy's bot, tjaapa 😊");
    }

    if (url.includes("duck")) {
        const rolledNumber = Math.floor(Math.random() * 500) + 1;
        if (rolledNumber === 1) {
            message.channel.send("# DUCK ER SÅ BAUBAU~ ♡");
        }
    }
}

