const WebSocket = require('ws')
const Telegraf = require('telegraf')
const config = require('./config.json');
const lang = require('./lang/'+config.lang+'.json');
const bot = new Telegraf(config.telegram_token)
const connection = new WebSocket(config.neato_url)

connection.onopen = () => {
    //do nothing
}
connection.onerror = error => {
    console.log(`WebSocket error: ${error}`)
}
connection.onmessage = e => {
    console.log(e.data)
}

bot.start((ctx) => ctx.reply(lang.start_text))
bot.help((ctx) => ctx.reply(lang.help_text))
bot.command(lang.battery_action, (ctx) => communicateNeato('GetCharger', ctx))
bot.command(lang.err_action, (ctx) => communicateNeato('GetErr', ctx))
bot.command(lang.res_err_action, (ctx) => communicateNeato('GetErr Clear', ctx))
bot.command(lang.log_action, (ctx) => communicateNeato('GetLifeStatLog', ctx))
bot.command(lang.clean_action, (ctx) => communicateNeato('Clean', ctx))
bot.command(lang.stop_action, (ctx) => communicateNeato('Clean', ctx))
bot.launch()

function communicateNeato(command, ctx) {
    console.log(ctx.from, '[' + new Date().toUTCString() + ']')
    if (ctx.chat.id == config.chat_id) {
        switch(command) {
            case 'GetCharger':
                connection.send(command)
                connection.onmessage = e => {
                    var output = ""
                    output += e.data.split("\n")[2].split(",")[1] + "% "
                    if (e.data.split("\n")[4].split(",")[1].includes("1")) {
                        output += lang.loading
                    } else {
                        output += lang.not_loading
                    }
                    ctx.reply(output)
                }
                break
            case 'GetErr':
                connection.send(command)
                connection.onmessage = e => {
                    var output = "Meldung:"
                    output += "\n" + e.data.split("\n")[1]
                    ctx.reply(output)
                }
                break
            case 'Clean':
                connection.send(command)
                connection.onmessage = e => {
                    var output = lang.clean_answer
                    ctx.reply(output)
                }
                break
            case 'Clean Stop':
                connection.send(command)
                connection.onmessage = e => {
                    var output = lang.clean_stop_answer
                    ctx.reply(output)
                }
                break
            case 'GetLifeStatLog':
                connection.send(command)
                connection.onmessage = e => {
                    ctx.reply(e.data.split("\n").slice(1).join("\n"))
                }
                break
            case 'GetErr Clear':
                connection.send(command)
                connection.onmessage = e => {
                    ctx.reply(lang.res_answer)
                }
                break
        }
    }
}