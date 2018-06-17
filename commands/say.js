const Discord = require("Discord.js");

module.exports.run = async (bot, message, args) => {

    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);

}

module.exports.help = {
    name: "say",
    description: "Sends a message as the bot",
    usage: "say <Message>",
    staffOnly: "true"
}
