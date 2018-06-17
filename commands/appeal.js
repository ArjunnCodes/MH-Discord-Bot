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

    let aEmbed = new Discord.RichEmbed

    aEmbed
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setThumbnail(bot.user.avatarURL)
    .setColor("#4286f4")
    .addField("Appeals", `If you wish to be unbanned, submit a ban appeal on the forums.`)
    .addField("Website:", 'https://www.mineheroes.net/forums/appeals/')
    .setFooter(`Requested by: ${message.author.username} (${message.author.id})`);

    message.channel.send({embed: aEmbed})
}   

}

module.exports.help = {
    name: "appeal",
    description: "Displays a forum link to create a ban appeal.",
    usage: "appeal",
    staffOnly: "false"
}
