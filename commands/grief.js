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
    
    let gEmbed = new Discord.RichEmbed

    gEmbed
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setThumbnail(bot.user.avatarURL)
    .setColor("#4286f4")
    .addField("Grief Support", `If you have been griefed, please make a grief support ticket on the forums.`)
    .addField("Website:", 'https://www.mineheroes.net/forums/griefs/')
    .setFooter(`Requested by: ${message.author.username} (${message.author.id})`);

    message.channel.send({embed: gEmbed})

}   

}

module.exports.help = {
    name: "grief",
    description: "Displays forum link to make a grief report.",
    usage: "grief",
    staffOnly: "false"
}