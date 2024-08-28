// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';

// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new TelegramBot(process.env.BOT_TOKEN);

        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            const { chat: { id }, text } = body.message;

            if (body.message.text === '/start') {
        // Ensure that this is a message being sent
            const game = process.env.GAME_SHORT_NAME || 'breakout';
            await bot.sendGame(id, game);
   
            }
            else { // if the message is not a command

            // Create a message to send back
            // We can use Markdown inside this
            const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;

            // Send our new message back in Markdown and
            // wait for the request to finish
            await bot.sendMessage(id, message, {parse_mode: 'Markdown'});
            }


        }

        // If the user presses the "Play" Button

        if (body.callback_query) {
            // Create a message to send back
            // We can use Markdown inside this
            // Retrieve the ID for this chat
            // and the text that the user sent
            const cbq_id = body.callback_query.id;
            const chat_id = body.callback_query.message.chat.id;
            const game = process.env.GAME_SHORT_NAME || 'breakout';
            const message = `⌛ Starting ` + game + `...`;
            await bot.sendMessage(chat_id, message, {parse_mode: 'Markdown'});

            // get game URL from .env, if not found default to example breakout game from littlejs
            const gameUrl = process.env.GAME_URL || 'https://killedbyapixel.github.io/LittleJS/examples/breakout/';

            await bot.answerCallbackQuery(
                cbq_id, { url: gameUrl });

        }
    }
    catch(error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }
    
    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    // The message here doesn't matter.
    response.send('OK');
};