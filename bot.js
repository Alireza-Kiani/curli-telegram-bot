const Telegraf = require('telegraf')
const validator = require('validator')
const fetch = require("node-fetch");
require('dotenv').config()

const shorten = async function (inputLink) {
    console.log(inputLink)
    if (validator.isURL(inputLink)){
        console.log('the reply is url')
        const response = await fetch('https://curli.ir/shortener', {
            method: 'post',
            body: JSON.stringify({
                link: inputLink
            }),
            headers: {
                'content-type': 'application/json'
            },
            redirect: 'follow'
        })
        const result = await response.json()
        console.log(result.shortLink)
        return  'here\'s your link : ' + 'https://curli.ir/' + result.shortLink
    } else {
        console.log('the reply is NOT url')
        return 'send a valid URL'
    }
}
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
    ctx.reply('Welcome to curli, send me your links so I can shorten them and give them to you!')
})
bot.on('message', async (ctx) => {
    ctx.reply(await shorten(ctx.update.message.text))
    console.log(ctx)
})
bot.launch()

