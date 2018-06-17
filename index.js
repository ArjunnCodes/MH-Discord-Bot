process.setMaxListeners(0);
const Discord = require("discord.js");
const botconfig = require("./botsettings.json");
const bot = new Discord.Client();
const fs = require("fs");
const talkedRecently = new Set();
bot.commands = new Discord.Collection

//CommandsFS 
fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.") 
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`)
        bot.commands.set(props.help.name, props);
    })

}) 

//code
bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let messageContent = message.content
    let prefix = botconfig.prefix;
    let messageArray = messageContent.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let sender = message.member;

    

    if (!messageContent.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    
   
    if (!commandfile) return message.reply(" - The command you have tried to use could not be found. Please use the help command to see a list of available commands.")
    .then(msg => {msg.delete(5000)});

    if (commandfile) {

        fs.readdir("./commands/", (err, files) => {

            if(err) console.log(err);
            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                console.log("Couldn't find commands.") 
                return;
            }
        
            let props = require(`./commands/${cmd}`);
        
        
        if (props.help.staffOnly === "true" && !message.member.roles.some(r => ["Sr. Moderator", "Administrator", "Developer", "Discord Management", "Helper", "Moderator", "owner"].includes(r.name))) {
            return message.channel.send("You don't have permission to use this command!").then(msg => {msg.delete});
        }
        else {
        commandfile.run(bot, message, args, talkedRecently, prefix)
        }
    })
    }



//Start of AntiAdvertisers
    if (messageContent.includes("discord.gg/") || messageContent.includes("discordapp.com/invite/")) {
        message.delete();
        message.reply("You can't advertise other discord servers here!").then(msg => {
            msg.delete(5000)
        })
        let aEmbed = new Discord.RichEmbed
        aEmbed
        .setTitle("Alert")
        .setDescription("Possible Advertiser")
        .setColor("#d87b1e")
        .addField("Member name:", `${message.author} (${message.author.id})`)
        .addField("Message:", `${message.content}`)
        .addField("Channel:", `${message.channel.name}`)
        .addField("Time:", `${message.createdAt}`);
        let aChannel = message.guild.channels.find(`name`, "action-log");
        if(!aChannel) return message.channel.send("There is no action-log channel!");
        aChannel.send({ embed: aEmbed })
    }

//End of AntiAdvertiser

    // if (cmd === `${prefix}help`) {
    //     fs.readdir("./commands/", (err, files) => {

    //         if(err) console.log(err);
    //         let jsfiles = files.filter(f => f.split(".").pop() === "js")
    //         if (jsfiles.length <= 0) {
    //             console.log("Couldn't find commands.") 
    //             return;
    //         }
        
    //         jsfiles.forEach((f, i) => {
    //             let props = require(`./commands/${f}`);
    //             console.log(`${f} loaded!`)
    //             bot.commands.set(props.help.name, props);
    //         })
        
    //     }) 
    //     var namelist = "";
    //     var desclist = "";
    //     var usage = "";

    //     jsfiles.forEach((f, i) => {
    //     let props = require(`./${f}`);
    //     namelist = props.help.name;
    //     desclist = props.help.description;
    //     usage = props.help.usage;

    //     // send help text
    //     message.author.send(`**${namelist}** \n${desclist} \n${usage}`);
    //     });


    // }

    //KICK COMMAND
    if (cmd === `${prefix}kick`) {
        let kChannel = message.guild.channels.find(`name`, "action-log");
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let kReason = args.join(" ").slice(22);
        if(!kChannel) return message.channel.send("There is no action-log channel!");
        if (!message.member.roles.some(r => ["Sr. Moderator", "Administrator", "Developer", "Discord Management", "Helper", "Moderator", "owner"].includes(r.name))) return message.channel.send("You don't have permission to use this command!");
        if(!kUser) return message.channel.send("The member you have specified could not be found!");
        if (kUser.id == message.author.id) return message.channel.send("You can't kick yourself");
        if (kUser.roles.some(r => ["Sr. Moderator", "Administrator", "Developer", "Discord Management", "Helper", "Moderator", "owner"].includes(r.name))) return message.channel.send("You cannot kick a staff member!");
        if (!kReason) return message.channel.send("Please specify a kick reason, for example 'spamming'");
        if (!kUser.kickable) return message.channel.send("I can't kick that player! Are they a higher rank?");

        let kEmbed = new Discord.RichEmbed()
        .setDescription("Punishment")
        .setColor("#5998ff")
        .addField("Type:", `Kick`)
        .addField("User:", `${kUser} (${kUser.id})`)
        .addField("Staff Member:", `${message.author} (${message.author.id})`)
        .addField("Time:", `${message.createdAt}`)
        .addField("Reason:", `${kReason}`)
        .setThumbnail(message.author.AvatarURL)
        await kUser.kick(kReason).then(msg => {
            kUser.send(`You have been kicked from ${message.guild.name} for ${kReason}`)
        }).then(
            kEmbed
            .setFooter(`Successfully kicked user`)
            .setColor('#3ddb5a')
        ).then(
            kChannel.send(kEmbed)
        ).catch(
            () => {}
        )
        message.delete();

    }
});
//LOGIN SECTION
bot.on("ready", onReady => {
    bot.user.setActivity('1 Server');
    console.log(`${bot.user.username} is now online, serving ${bot.guilds.size} guilds with ${bot.users.size} members`);
});
bot.login(botconfig.token);