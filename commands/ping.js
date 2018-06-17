const Discord = require("Discord.js");
module.exports.run = async (bot, message, args, talkedRecently) => {
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Wait 5 seconds before using another command " + message.author).then(msg => {msg.delete(5000)});
        message.delete();
    }
    else {

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    var pingMessage = await message.channel.send("Checking ping");
    message.delete();
    pingMessage.edit(`Pong! Latency is ${pingMessage.createdTimestamp - message.createdTimestamp}ms. Bot ping is ${Math.round(bot.ping)}ms`);
}   

}

module.exports.help = {
    name: "ping",
    description: "Displays ping information of the bot and API",
    usage: "ping",
    staffOnly: "false"
}