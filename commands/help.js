const fs = require("fs");
const Discord = require("discord.js");
const requestedHelp = new Set();

module.exports.run = async (bot, message, args, con, prefix) => {
    message.delete();
    if (requestedHelp.has(message.author.id)) {
        message.channel.send("Please wait 30 seconds before using that command again " + message.author).then(msg => {msg.delete(5000)});
    }
    else {

    requestedHelp.add(message.author.id);
    setTimeout(() => {
      requestedHelp.delete(message.author.id);
    }, 30000);



    fs.readdir("./commands/", (err, files) => {
        if(err) console.error(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <= 0) {
            console.log("No commands to load for help!");
            return;
        }

        var namelist = "";
        var desclist = "";
        var usage = "";
        
        let hEmbed = new Discord.RichEmbed
        hEmbed
        .setTitle("MineHeroes")
        .setDescription("Here is a list of the available commands for " + bot.user.username)
        .addBlankField()
        .setThumbnail(bot.user.avatarURL)
        .setColor("#4286f4")
        

        let result = jsfiles.forEach((f, i) => {
            let props = require(`./${f}`);
            namelist = props.help.name;
            desclist = props.help.description;
            usage = props.help.usage;

            if (props.help.staffOnly === "true") return;

            hEmbed
            .addField(`${prefix}${namelist}`, `Description: ${desclist} \nUsage: ${prefix}${usage}`)


            // send help text
        });
        message.author.send({embed: hEmbed});
        message.delete();
    });
}

}

module.exports.help = {
    name: "help",
    description: "Messages the user with a list of commands",
    usage: "help",
    staffOnly: "false"
}
