const { readFileSync } = require('fs')
require('dotenv').config({path: './mongo.env'});
require('dotenv').config({path: './owner.env'});
require('dotenv').config({path: './session.env'});
require('dotenv').config({path: './bot.env'});

module.exports = {
    /**
     * bot details and parameters
     */
    botname: process.env.BotName || "Queen Anya Bot",
    footer: process.env.Footer || "© Queen Anya Bot",
    prefa: process.env.Prefix || "-,.Joppa",
    themeemoji: process.env.ThemeEmoji || "🎐",

    /**
     * owner details and parameters
     */
    ownername: process.env.Owner_Name || "Judex-beast",
    ownernumber: process.env.Owner_Number || "2349014899047",
    instagramId: process.env.Insta || "3.69_pika",

    /**
     * other details and parameters
     */
    author: process.env.Author || "@PikaBotz",
    packname: process.env.PackName || "Queen Anya v2 MD",
    socialLink: process.env.Web || "https://github.com/PikaBotz",
    groupLink: process.env.GcLink || "https://chat.whatsapp.com/E490r0wSpSr89XkCWeGtnX",
    warns: Number(process.env.Warn_Limits) || 3,
    cooldown: 5, // default cooldown time per command in seconds
    mongoUrl: process.env.MongoDB || "mongodb+srv://sam:sam@cluster0.u1smxsv.mongodb.net/?retryWrites=true&w=majority",
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUFic3RmejlDUEdiaTFxYnpuMGI4VERqbVVjbzl2QldXM0Vud0RNNXpYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOXdFWDJ2QjJvVTdrV1VjRy9tU0MxNUVPU3hDd2dTOEJkK2ZpQ1dmZ2t3ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLRTRuN1hnakEydUwzV3VMOWRmM0RtZGUxU3JLTzZLR2s3RE5ZaDlTbTNjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4TUh4RGsrdk4ya3A3WllpWTk0ZWdDNnpMMVRCeGNQZXBwQmdRbE9tem5ZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJCdk1YdWZ4STdpUlBWWU5GQng2K254S1RKZyswbFZhWWd0bGh6MW9rSEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inp3cU14dm14QW1GckVEd1F5REl4Y1RUSHBaMDFURGNXbURMWDdTdk9VUlU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtYcHA3OUkzTkZEbjBkZUx5Z0I4SDBNT3QraWlKZ3JPTHVRRWFXZlJXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTA5NUpJOW1xZDFuSHgwcDVxUHN3UnBRRnZZeld3akM5Z2lVemVubzBrcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB5ejlObFByUjRhMUsrdWRndEtrYi9UZGo2RXNhclIvK1IwMVJxcjk5aVZhdXA3OTJoeGp1dVVJWExjaU9IWHhmKzAzVlJNUWNXTmhpdytjSTVsaGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIwLCJhZHZTZWNyZXRLZXkiOiI3UWNmVTVnSlBaT2pEdytFVWtVMmxMMm5BNHB4UlB6Sm9MOHdHQjJOYmRrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI3RTFyRGI4RlFqMlJHaUQxbFhiV2VnIiwicGhvbmVJZCI6IjEwMDFmZDdlLThmNGItNGMzMC1iODQ0LWZmYmM3MzZjOTBkZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrOGFxNG5Lck5mMVliTmppRnB1OGNmblNSSm89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMzh3Z21zUktnejJROUFySjR2M0huQ3ZuZjlnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik42QVNQUDM0IiwibWUiOnsiaWQiOiIyMzQ5MDE0ODk5MDQ3Ojg4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkpvcHBhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLYTEwMmtRcXN5S3VBWVlIaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJTSWk0a0sycnZDVklWeU4rR0Vxb2Ywdlo4MS9NckZPS1kxMEJEd21POGdBPSIsImFjY291bnRTaWduYXR1cmUiOiJSUzdNallkTDBxcDNUVkYxQmxtRFh5YTdFNk54SXJPVzJZYmJCaG5ILzUyeWs1Y3JNelNYRHA3QUlobEFxUXAwcnFrZmhGa2g0TGxpcHA0MGdFdFBDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidzlYUFhDaXZNQXNVeDBIdHdDMDJ1blMyc2phV0EwaWhRamE5eXhnVVFqSEhqdzdxcElDbjhhQ1gzM3o1amIwWmdBdFB2NHE1V01OSzlPRE9qMXhpakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDE0ODk5MDQ3Ojg4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVpSXVKQ3RxN3dsU0ZjamZoaEtxSDlMMmZOZnpLeFRpbU5kQVE4Smp2SUEifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjgyMjY4NzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT05iIn0=",

    /**
     * thumbnails and medias
     */
    image_1: readFileSync('./lib/Assets/image_1.jpg'), // primary image
    image_2: readFileSync('./lib/Assets/image_2.jpg'), // secondry image
    imageUrl: "https://i.ibb.co/ZKKSZHT/Picsart-23-06-24-13-36-01-843.jpg", // image url, to replace to your url upload your image to https://imgbb.com
    imageMentionUrl: "https://i.ibb.co/ZKKSZHT/Picsart-23-06-24-13-36-01-843.jpg", // image for mention reply audio media
    aliveMedia: readFileSync("./lib/Assets/aliveMedia.mp4"),
    menuMedia: readFileSync('./lib/Assets/menuMedia.mp4'),
    ownerMentionMp3: readFileSync('./lib/Assets/ownerMentionMp3.mp3'),  // audio for mention reply audio media

    /**
     * core parameters and values
     */
    ownercon: { key: { fromMe: false, participant: '0@s.whatsapp.net', ...({ remoteJid: 'status@broadcast' }), }, message: { contactMessage: { displayName: this.ownername, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${this.ownername},;;;\nFN:${this.ownername}\nitem1.TEL;waid=${this.ownernumber}:${this.ownernumber}\nitem1.X-ABLabel:Mobile\nEND:VCARD`, jpegThumbnail: this.image_2, thumbnail: this.image_2, sendEphemeral: true } } },
    fakeshop: { key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" }, message: { orderMessage: { itemCount: 1234, status: 200, thumbnail: this.image_1, surface: 200, message: this.botname, orderTitle: this.ownername, sellerJid: '0@s.whatsapp.net'}}, contextInfo: { forwardingScore: 999, isForwarded: true}, sendEphemeral: true },
    message: {
        success: "✅ 𝚂𝚞𝚌𝚌𝚎𝚜𝚜! 𝙾𝚙𝚛𝚊𝚝𝚒𝚘𝚗 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎𝚍.",
        admin: "*👤 A𝙳𝙼𝙸𝙽 N𝙴𝙴𝙳𝙴𝙳!*\n\n- Dear, this command is only for Admins. You have to be a admin in this group to use this command.",
        botAdmin: "*🤖 B𝙾𝚃 A𝙳𝙼𝙸𝙽 N𝙴𝙴𝙳𝙴𝙳!*\n\n- I'm not an Admin, so I can't execute this command in this group. Please make me an Admin.",
        owner: "*👑 O𝚆𝙽𝙴𝚁 N𝙴𝙴𝙴𝙳𝙴𝙳!*\n\n- Bruh, this command is only made for this bot's owner. So you can't use this command.",
        group: "*👥 G𝚛𝚘𝚞𝚙 N𝚎𝚎𝚍𝚎𝚍!*\n\n- This command can only be executed in a group chat.",
        private: 'This command is only for private chats.',
        wait: '🔄 Processing request...',
        error: "❌ Oops! An error occurred while processing your request. Please try again later.",
        ban: `You're banned from using this bot!`,
        nsfw: 'This group is not *NSFW* enabled.',
        banChat: 'This group is banned from using this bot, please contact owner to get unbanned.'
    }
}
