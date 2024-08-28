require('dotenv').config();

const getWebhookInfo = async () => {
    const response = await fetch('https://api.telegram.org/bot' + process.env.BOT_TOKEN + '/getWebhookInfo');

    const result = await response.json();
    console.log(result);
}

const setWebhookLocal = async () => {
    const response = await fetch('https://api.telegram.org/bot' + process.env.BOT_TOKEN + '/setWebhook?url=' + process.env.NGROK_URL + '/api/webhook');

    const result = await response.json();
    console.log(result);
}

const setWebhookProd = async () => {
    const response = await fetch('https://api.telegram.org/bot' + process.env.BOT_TOKEN + '/setWebhook?url=' + process.env.VERCEL_URL + '/api/webhook');

    const result = await response.json();
    console.log(result);
}


// get the script parameters
const op = process.argv[2];

switch (op) {
    case 'get-webhook-info':
        getWebhookInfo();
        break;
    case 'set-webhook-local':
        setWebhookLocal();
        break;
    case 'set-webhook-prod':
        setWebhookProd();
        break;
    
    default:
        console.log('Invalid operation');
        break;
}

