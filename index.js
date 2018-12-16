require('dotenv').config();

const TeleBot = require('telebot');
const { getText } = require('./text');

const bot = new TeleBot({
	token: process.env.API_KEY
});

const DAY = 24 * 60 * 60 * 1000;

const getCounters = () => {
	const electionDay = new Date('2019/03/31 00:00:00');
	const now = new Date();
	const diff = electionDay - now;
	const restDate = new Date(diff % DAY);
	const days = Math.round(diff / DAY);
	const hours = restDate.getUTCHours();
	const minutes = restDate.getMinutes() + 1;

	return [days, hours, minutes];
};

const getTimerText = () => {
	const couters = getCounters();

	return getText('timer', ...couters);
};

const updateTimer = (chatId, messageId) => 
	setInterval(_ => {
        bot.editMessageText({chatId, messageId}, getTimerText())
        	.catch(error => console.log('sendMessage', error));
    }, 60000);

let interval;
let prevMsgId;

bot.on('newChatMembers',  ({ chat: { id: chatId } }) => {
	interval && clearInterval(interval);

	prevMsgId && bot.deleteMessage(chatId, prevMsgId)
		.catch(error => console.log('deleteMessage', error));

	bot.sendMessage(chatId, getTimerText(), {parseMode: 'html'})
		.then(({ message_id, chat }) => {
			prevMsgId = message_id;
			interval = updateTimer(chat.id, message_id);
		})
		.catch(error => console.log('sendMessage', error));
});

bot.start();
