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
    let rEmbed = new Discord.RichEmbed

    rEmbed
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setThumbnail(bot.user.avatarURL)
    .setColor("#4286f4")
    .addField("Registering", `If you don't have a forums account, connect to play.mineheroes.net and use the command`)
    .addField("Website:", 'https://www.mineheroes.net/wiki/rules/')
    .setFooter(`Requested by: ${message.author.username} (${message.author.id})`);

    message.channel.send({embed: rEmbed})
}
}

module.exports.help = {
    name: "register",
    description: "Displays instructions on how to create a forums account.",
    usage: "register",
    staffOnly: "false"
}