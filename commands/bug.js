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
    let bEmbed = new Discord.RichEmbed

    bEmbed
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setThumbnail(bot.user.avatarURL)
    .setColor("#4286f4")
    .addField("Bug Reports", `If you have found a bug, report it on the forums.`)
    .addField("Website:", 'https://www.mineheroes.net/forums/bugs/')
    .setFooter(`Requested by: ${message.author.username} (${message.author.id})`);

    message.channel.send({embed: bEmbed})

}   

}

module.exports.help = {
    name: "bug",
    description: "Displays forum link to make a bug report.",
    usage: "bug",
    staffOnly: "false"
}