const texts = {
	timer: (days, hours, minutes, seconds) => 
		`До ликвидации поста Президента Украины осталось:
			<b>${days} дней ${hours} часов ${minutes} минут</b>
			Скажи что думаешь…
			Но перед этим лучше почитай все аргументы.
			И посмотри все промо видео.
			А то Denisimus нервный`
};

module.exports = {
	getText: (key, ...args) => {
		if (typeof texts[key] === 'function') {
			return texts[key](...args);
		} else {
			return texts[key];
		}
	}
}
