const {
    Telegraf,
    Markup
} = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('HTML', 'btn_1'), Markup.button.callback('CSS', 'btn_2'), Markup.button.callback('JS', 'btn_3')]
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})

function addActionBot(buttonId, src, text) {
    bot.action(buttonId, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true //блокировать превью ссылки
            })
        } catch (e) {
            console.error(e)
        }
    })
}
// bot.action('btn_1', async (ctx) => {
//     try {
//         await ctx.answerCbQuery()
//         await ctx.replyWithHTML('Button HTML Action', {
//             disable_web_page_preview: true
//         })
//     } catch (e) {
//         console.error(e)
//     }
// })

addActionBot('btn_1', './img/1.webp', text.text1)
addActionBot('btn_2', './img/2.webp', text.text2)
addActionBot('btn_3', false, text.text3)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
