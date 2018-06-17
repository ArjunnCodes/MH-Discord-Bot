const Discord = require("Discord.js");
module.exports.run = async (bot, message, args, talkedRecently) => {
    message.delete();
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Wait 5 seconds before using another command " + message.author).then(msg => {
            msg.delete(5000);
        });
    }
    else {

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    let iEmbed = new Discord.RichEmbed

    iEmbed
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setDescription("Bot info")
    .setThumbnail(bot.user.avatarURL)
    .setColor("#4286f4")
    .addField("Version", `3.0.1`)
    .addField("Created by", 'BasicallyLouis and Arjunn_')
    .setFooter(`Requested by: ${message.author.username} (${message.author.id})`);

    message.channel.send({embed: iEmbed})
}
}

module.exports.help = {
    name: "info",
    description: "Displays basic information about the bot.",
    usage: "info",
    staffOnly: "false"
}