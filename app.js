require('dotenv').config();

const {App} = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN
});

app.event('app_mention', ({ say }) => {
        say('こんにちは！現在のお気持ちはいかがですか？\n:hugging_face::wink::neutral_face::thinking_face::pleading_face::innocent::rage:');
});

app.event('reaction_added',async({event, say}) => {
    const bot_id = process.env.BOT_ID;
    if (bot_id===event.item_user){
        switch(event.reaction){
            case 'hugging_face':
                await say(`<@${event.user}>さんは元気いっぱいです。:hugging_face:`);
                break;
            case 'wink':
                await say(`<@${event.user}>さんは調子が良いようです。:wink:`);
                break;
            case 'neutral_face':
                await say(`<@${event.user}>さんは普通の顔をしています。:neutral_face:`);
                break;
            case 'thinking_face':
                await say(`<@${event.user}>さんは考えています...:thinking_face:`);
                break;
            case 'pleading_face':
                await say(`<@${event.user}>さんはぴえんな気持ちのようです。:pleading_face:`);
                break;
            case 'innocent':
                await say(`<@${event.user}>さんは天使の笑顔を浮かべています。:innocent:`);
                break;
            case 'rage':
                await say(`<@${event.user}>さんが怒りました！:rage:`);
                break;
            case 'dusty_stick':
                await say(`<@${event.user}>さんは汚い棒を振りかざしています。:dusty_stick:`);
                break;   
        }
    }
});

(async() =>{
await app.start(process.env.PORT || 3000);

console.log('⚡️ Bolt app is running!');

})();